import React from "react"
import { useState } from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Header from "../components/header"
import "../styles/style.css"
import "../styles/blogListStyles.css"
import "../styles/headerStyles.css"
import PostLink from "../components/post-link"
import PostFull from "../components/post-full"


import Toggle from "react-toggle"

import errorUnknown from "../images/Site-8856.png"
import aroundTheCorner from "../images/4888.png"
import fallingChaos from "../images/97568.png"

const IndexPage = ({
      data: {
        allMarkdownRemark: { edges },
      },
    }) => {
      const ThoughtPosts = edges
        .filter(edge => !!edge.node.frontmatter.thought) // You can filter your posts based on some criteria
        .map(edge => <PostLink class="post-link" key={edge.node.id} post={edge.node} />)
      const ArticlePosts = edges
        .filter(edge => !!edge.node.frontmatter.article) // You can filter your posts based on some criteria
        .map(edge => <PostLink class="post-link" key={edge.node.id} post={edge.node} />)

      const Posts = edges
        .filter(edge => !!edge.node.frontmatter.date)
        .map(edge => <PostFull class="post-link-full" key={edge.node.id} post={edge.node} />)

    const [scrollRead, setScrollRead] = useState(false)

    const updateScrollRead = () => {
      setScrollRead(!scrollRead)
    }

    return (
        <>
            <Header />
            <div class="content">
                <p class="description">Hey, I'm a software engineer. In my spare time I work on turning <a href="https://qyll.dev">Qyll</a> into a useful tool for writers. All the images you see below were created with code! Take a look at my <a href="https://github.com/erdavids/generative-art">GitHub</a> for more examples, and email me at thebuffed [at] gmail [dot] com if you're interested in purchasing.</p>
                
                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><img class="artImage" src={errorUnknown} /></div>
                    <figcaption>Error Unknown</figcaption>
                    <figcaption>$79.00</figcaption>
                </figure>
                <figure>
                    <div class="flex-col"><img class="artImage" src={aroundTheCorner} /></div>
                    <figcaption>Around the Corner</figcaption>
                    <figcaption>$79.00</figcaption>
                </figure>
                <figure>
                    <div class="flex-col"><img class="artImage" src={fallingChaos} /></div>
                    <figcaption>Falling Chaos</figcaption>
                    <figcaption>$129.00</figcaption>
                </figure>
                </div>

                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><img class="artImage" src="../images/4446.png" /></div>
                    <figcaption>Above and Below</figcaption>
                    <figcaption>$149.00</figcaption>
                </figure>
                <figure>
                    <div class="flex-col"><img class="artImage" src="../images/Abstract-thin.png" /></div>
                    <figcaption>Threads</figcaption>
                    <figcaption>$129.00</figcaption>
                </figure>
                </div>

                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><img class="artImage" src="../images/offset-1.png" /></div>
                    <figcaption>Offset Quads</figcaption>
                    <figcaption>$99.00</figcaption>
                </figure>
                <figure>
                    <div class="flex-col"><img class="artImage" src="../images/circle_five.png" /></div>
                    <figcaption>The Fifth Circle</figcaption>
                    <figcaption>$79.00</figcaption>
                </figure>
                <figure>
                    <div class="flex-col"><img class="artImage" src="../images/paths-1.png" /></div>
                    <figcaption>Paths</figcaption>
                    <figcaption>$79.00</figcaption>
                </figure>
                </div>

                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><img class="artImage" src="../images/city-1.png" /></div>
                    <figcaption>Binary Waterfall</figcaption>
                    <figcaption>$79.00</figcaption>
                </figure>
                <figure>
                    <div class="flex-col"><img class="artImage" src="../images/fire-waves.png" /></div>
                    <figcaption>Fire and Waves</figcaption>
                    <figcaption>$249.00</figcaption>
                </figure>
                </div>

                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><img class="artImage" src="../images/mondrian-1.png" /></div>
                    <figcaption>Mondrian Tiles</figcaption>
                    <figcaption>$59.00</figcaption>
                </figure>
                <figure>
                    <div class="flex-col"><img class="artImage" src="../images/0-5-60.png" /></div>
                    <figcaption>Bricks</figcaption>
                    <figcaption>$79.00</figcaption>
                </figure>
                <figure>
                    <div class="flex-col"><img class="artImage" src="../images/lines-trippy-1.png" /></div>
                    <figcaption>Trippy Growth</figcaption>
                    <figcaption>$79.00</figcaption>
                </figure>
                </div>
                

                
                
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