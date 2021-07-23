import React from "react"
import { Link } from "gatsby"
import "../styles/blogListStyles.css"

const PostLink = ({ post }) => (
  <div class="post-link-full">
    <Link class="post-link" to={post.frontmatter.slug}>
      <h1 class="post-link-full-title">{post.frontmatter.title}</h1>
      <h1 class="post-link-full-date">{post.frontmatter.date}</h1>
      {/* <h1 class="post-link-full-date">{post.frontmatter.date}</h1> */}
    </Link>
    <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
    
  </div>
)
export default PostLink