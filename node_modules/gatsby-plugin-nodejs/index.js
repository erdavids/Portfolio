const path = require("path");
const fs = require("fs");

// Disable gatsby files serving, for example when building the site
const args = process.argv.slice(2);
const disableGatsby = args.includes("--no-gatsby");

/**
 * Prepares app for Gatsby enviroment
 * @param {object} config - server client configuration of gatsby-plugin-nodejs
 * @param {function} cb - callback with rest of app logic inside
 */
function prepare({ app, framework = "express" }, cb) {
  const config = JSON.parse(fs.readFileSync(path.resolve("./public", "gatsby-plugin-node.json")));

  function forFramework(handlers) {
    return (
      handlers[framework] ||
      function () {
        throw new Error(`Uncompatible framework: ${framework}`);
      }
    );
  }

  function withPrefix(path) {
    return (config.pathPrefix || "") + path;
  }

  if (!disableGatsby) {
    // Serve static Gatsby files
    forFramework({
      express: () => {
        const express = require("express");
        app.use(withPrefix("/"), express.static("public"));
      },
      fastify: () => {
        app.ignoreTrailingSlash = true;
        app.register(require("fastify-static"), {
          root: path.resolve("./public"),
          prefix: withPrefix("/"),
        });
      },
    })();

    // Gatsby redirects
    for (const r of config.redirects) {
      forFramework({
        express: () => {
          app.get(withPrefix(r.fromPath), (req, res) => {
            const toPath = /https?:\/\//.test(r.toPath) ? r.toPath : withPrefix(r.toPath);

            res.status(r.statusCode || r.isPermanent ? 301 : 302).redirect(toPath);
          });
        },
        fastify: () => {
          app.get(withPrefix(r.fromPath), (req, reply) => {
            const toPath = /https?:\/\//.test(r.toPath) ? r.toPath : withPrefix(r.toPath);

            reply.code(r.statusCode || r.isPermanent ? 301 : 302).redirect(toPath);
          });
        },
      })();
    }

    // Client paths
    for (const p of config.paths.filter((p) => p.matchPath)) {
      forFramework({
        express: () => {
          app.get(withPrefix(p.matchPath), (req, res) => {
            res.sendFile(path.resolve("./public", p.path.replace("/", ""), "index.html"));
          });
        },
        fastify: () => {
          app.get(withPrefix(p.matchPath), (req, reply) => {
            reply.sendFile(path.resolve("./public", p.path.replace("/", ""), "index.html"));
          });
        },
      })();
    }
  }

  // User-defined routes
  cb();

  if (!disableGatsby) {
    // Gatsby 404 page
    forFramework({
      express: () => {
        app.use((req, res) => {
          res.status(404).sendFile(path.resolve("./public", "404.html"));
        });
      },
      fastify: () => {
        app.setNotFoundHandler((req, reply) => {
          reply.sendFile(path.resolve("./public", "404.html"));
        });
      },
    })();
  }
}

module.exports = {
  prepare,
};
