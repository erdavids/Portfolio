import React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"
import "../styles/blogListStyles.css"
import PostLink from "../components/post-link"
import PostFull from "../components/post-full"

import me from "../images/me.png"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
    return (
        <>
            <Header />
            <div class="content">
              <p class="description">I'm a software engineer that loves making art with code, particularly art that utilizes the simplicity of rectangles and their outlines.</p>
              <p class="description">For years, I released my code on GitHub with random generative art projects, which <a href="https://www.github.com/erdavids/generative-art">you can still find here</a>.</p>
              <p class="description">If you want regular updates on what I'm working on, <a href="https://www.twitter.com/thebuffed">I try to post often on Twitter</a>.</p>
              <p class="description">Thank you for your interest in my work.</p>
              <p class="description">Every interaction means the world.</p>
              <p align="center"><div class="flex-col"><img class="artImage" src={me} /></div></p>

            </div>
        </>
    )


}

export default IndexPage

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