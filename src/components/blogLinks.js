import React from "react"
import { useState } from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import Header from "../components/header"
import "../styles/style.css"
import "../styles/blogListStyles.css"
import "../styles/headerStyles.css"
import PostLink from "../components/post-link"
import PostFull from "../components/post-full"


import Toggle from "react-toggle"

const BlogLinks = ({
    data: {
      allMarkdownRemark: { edges },
    },
  }) => {
    const Posts = edges
      .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
      .map(edge => <PostLink class="post-link" key={edge.node.id} post={edge.node} />)
  
      const FullPosts = edges
      .filter(edge => !!edge.node.frontmatter.date)
      .map(edge => <PostFull class="post-link-full" key={edge.node.id} post={edge.node} />)
  
  
      return (
          <>
              <Header />
              <div class="content">
  
                  <div>
                      <h1>Thoughts</h1>
                      <div class="blog-list">{Posts}</div>
                  </div>
                  {/* <div class='some-page-wrapper'>
                    <div class='row'>
                      <div class='column'>
                        <div class="blog-list">{FullPosts[0]}</div>
                      </div>
                      <div class='column'>
                        <h1>Thoughts</h1>
                        <div class="blog-list">{Posts}</div>
                      </div>
                    </div>
                  </div> */}
              </div>
          </>
      )
  
  
  }
export default BlogLinks

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
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
    }
  }
`