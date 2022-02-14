import React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"
import "../styles/blogListStyles.css"
import PostLink from "../components/post-link"
import PostFull from "../components/post-full"

import mas2 from "../images/masonry-13.png"
import mas3 from "../images/masonry-14.png"
import mas4 from "../images/masonry-15.png"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
    return (
        <>
            <Header />
            <div class="content">
            
                <h1 class="column-title">Masonry</h1>
                <p class="description">Deceptively simple, Masonry is one of my favorite projects to date. In it's simplest form, it's really just rectangles that have their fill color and outlines deformed. There are other random elements that lead to incredible outputs.</p>
                <p class="description">If you're interested in minting one for yourself, <a href="https://www.artblocks.io/project/259">check out the project here</a>.</p>
                {/* <p class="dscription">Read more.</p> */}
                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000081"><img class="artImage" src={mas2} /></a></div>
                </figure>
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000044"><img class="artImage" src={mas3} /></a></div>
                </figure>
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000082"><img class="artImage" src={mas4} /></a></div>
                </figure>
                </div> </div>
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