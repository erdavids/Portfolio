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
              <p class="description">I'm a software engineer that loves making art with code.</p>
              <p class="description">I want to create things that bring something positive to the lives of even the people I'll never meet.</p>
              <p class="description">I'm working on a novel and one of the characters is a cat that wears a wristwatch.</p>
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