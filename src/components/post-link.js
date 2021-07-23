import React from "react"
import { Link } from "gatsby"
import "../styles/blogListStyles.css"

const PostLink = ({ post }) => (
  <div>
    <Link class="post-link" to={post.frontmatter.slug}>
      <span class="post-link-title">{post.frontmatter.title}</span>
      {/* <span class="post-link-title">{post.frontmatter.title}   </span><span class="post-link-date">{post.frontmatter.date}</span> */}
    </Link>
  </div>
)
export default PostLink