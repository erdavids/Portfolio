const fs = require("fs");
const { exec } = require("child_process");
const nodemon = require("nodemon");
const chalk = require("chalk");

function log(...str) {
  console.log(chalk.magenta("[custom server]"), ...str);
}

let proc = null;
let watchProc = null;

function generateConfig({ pathPrefix, store }) {
  const { pages, redirects } = store.getState();

  const p = [];
  for (const page of pages.values()) {
    p.push({
      matchPath: page.matchPath,
      path: page.path,
    });
  }

  const config = {
    paths: p,
    redirects,
    pathPrefix,
  };

  !fs.existsSync("public/") && fs.mkdirSync("public/");

  fs.writeFileSync("public/gatsby-plugin-node.json", JSON.stringify(config, null, 2));
}

exports.onPreInit = function ({ pathPrefix, store }) {
  generateConfig({ pathPrefix, store });

  return new Promise((resolve, reject) => {
    if (fs.existsSync("server/index.js")) {
      log("Starting the custom Node.js server for the buildtime...");
      proc = exec("node server/index.js --no-gatsby");

      proc.stdout.on("data", (data) => {
        log(`${data}`);
        resolve();
      });

      proc.on("error", (err) => {
        log(`${err}`);
        reject();
      });
    } else {
      resolve();
    }
  });
};

exports.onPostBuild = function ({ store, pathPrefix }) {
  generateConfig({ pathPrefix, store });
};

exports.onPostBootstrap = function () {
  // Finish the buildtime custom server
  proc && proc.kill();

  // Run the server via nodemon for the development time
  if (process.env.NODE_ENV === "development" && fs.existsSync("server/index.js")) {
    log("Starting the custom server in watch mode using nodemon...");

    return new Promise((resolve, reject) => {
      watchProc = nodemon({
        script: "server/index.js",
        args: ["--no-gatsby"],
        ignore: ["src", "node_modules", ".cache", "public", "gatsby-*"],
        ext: "js json ts",
        stdout: false,
      });

      watchProc.on("log", ({ colour }) => console.log(colour));
      watchProc.on("stdout", (data) => {
        log(String(data));
      });
      watchProc.on("start", () => resolve());
    });
  }
};

process.on("beforeExit", () => watchProc.kill());
