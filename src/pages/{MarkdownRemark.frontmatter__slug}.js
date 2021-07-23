import React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"
import "../styles/blogListStyles.css"
import BlogLinks from "../components/blogLinks"
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <>
    <Header />
      <div className="content">
        <h1 class="post-link-full-title">{frontmatter.title}</h1>
        {/* <h2>{frontmatter.date}</h2> */}
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <h1 class="post-link-full-date">{frontmatter.date}</h1>
      </div>
    </>
  )
}
export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MM/DD/YY")
        slug
        title
        thought
        article
      }
    }
  }
`