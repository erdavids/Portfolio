
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/thebuffed/Documents/Portfolio/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/thebuffed/Documents/Portfolio/src/pages/404.js")),
  "component---src-pages-about-js": preferDefault(require("/Users/thebuffed/Documents/Portfolio/src/pages/about.js")),
  "component---src-pages-art-js": preferDefault(require("/Users/thebuffed/Documents/Portfolio/src/pages/art.js")),
  "component---src-pages-blog-js": preferDefault(require("/Users/thebuffed/Documents/Portfolio/src/pages/blog.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/thebuffed/Documents/Portfolio/src/pages/index.js")),
  "component---src-pages-markdown-remark-frontmatter-slug-js": preferDefault(require("/Users/thebuffed/Documents/Portfolio/src/pages/{MarkdownRemark.frontmatter__slug}.js"))
}

