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

import end1 from "../images/endeavor/1.png"
import end2 from "../images/endeavor/2.png"
import end3 from "../images/endeavor/3.png"

import aps1 from "../images/aps/1.png"
import aps2 from "../images/aps/2.png"
import aps3 from "../images/aps/3.png"

import dsw1 from "../images/dsw/1.png"
import dsw2 from "../images/dsw/2.png"
import dsw3 from "../images/dsw/3.png"

import mas1 from "../images/mas/token-162.png"
import mas2 from "../images/mas/token-26.png"
import mas3 from "../images/mas/token-147.png"

import tom1 from "../images/meadow/token-0.png"
import tom2 from "../images/meadow/token-149.png"
import tom3 from "../images/meadow/token-132.png"

import cu1 from "../images/chord/token-66.png"
import cu2 from "../images/chord/token-379.png"
import cu3 from "../images/chord/token-155.png"

import ug1 from "../images/ug/1.png"
import ug2 from "../images/ug/2.png"
import ug3 from "../images/ug/3.png"



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
                <p class="description">I've been making <a href="https://github.com/erdavids/Generative-Art">Generative Art</a> through code since around 2018. Many of my projects use a simple technique of deforming the corners of a rectangle.</p>
                <p class="description"></p>
                <p class="description">I could never say thank you enough for all the opportunities I've experienced and the support I've been given.</p>
                <p class="description">You can see my projects either on <a href="https://www.artblocks.io/user/0xc0f11179732cb1c7fde61201588506249de21dc1">Art Blocks</a> or <a href="https://www.fxhash.xyz/u/Eric%20Davidson">FxHash</a>, and keep up with what I'm doing on <a href="https://twitter.com/TheBuffED">Twitter</a>.</p>

                <h2>Current Work-in-Progress</h2>
                <p class="description">The elements of this project are inspired by the early stages of the creative process, sketches from famous artists like Anni Albers and Kenneth Martin, and pages from my own various notebooks.</p>
                <div class="flex-grid-container">
                <img class="artImage" src={ug1} />
                <img class="artImage" src={ug3} />
                <img class="artImage" src={ug2} />
                </div>

                <h2>Endeavor</h2>
                <div class="flex-grid-container">
                <img class="artImage" src={end1} />
                <img class="artImage" src={end2} />
                <img class="artImage" src={end3} />
                </div>


                <h2>Departure Within Shattered Windmills</h2>
                <div class="flex-grid-container">
                <img class="artImage" src={dsw1} />
                <img class="artImage" src={dsw2} />
                <img class="artImage" src={dsw3} />
                </div>

                <h2>Thoughts of Meadow</h2>
                <div class="flex-grid-container">
                <img class="artImage" src={tom1} />
                <img class="artImage" src={tom2} />
                <img class="artImage" src={tom3} />
                </div>

                <h2>Across Paper Stones</h2>
                <div class="flex-grid-container">
                <img class="artImage" src={aps1} />
                <img class="artImage" src={aps2} />
                <img class="artImage" src={aps3} />
                </div>

                <h2>Chord Unknown</h2>
                <div class="flex-grid-container">
                <img class="artImage" src={cu1} />
                <img class="artImage" src={cu2} />
                <img class="artImage" src={cu3} />
                </div>

                <h2>Masonry</h2>
                <div class="flex-grid-container">
                <img class="artImage" src={mas1} />
                <img class="artImage" src={mas2} />
                <img class="artImage" src={mas3} />
                </div>



                {/* <div class="flex-grid-container">
                <img class="artImage" src={mas9} />
                <img class="artImage" src={mas9} />
                <img class="artImage" src={mas9} />
                </div> */}
                

                
                
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