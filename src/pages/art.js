import React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"
import "../styles/blogListStyles.css"
import PostLink from "../components/post-link"
import PostFull from "../components/post-full"

import mas2 from "../images/masonry-13.png"
import mas3 from "../images/masonry-14.png"
import mas4 from "../images/masonry-15.png"

import int1 from "../images/34.png"
import int2 from "../images/13.png"
import int3 from "../images/19.png"
import int4 from "../images/33.png"

import aps1 from "../images/aps/21.png"
import aps2 from "../images/aps/50.png"

import meadow1 from "../images/meadow/8.png"
import meadow2 from "../images/meadow/7.png"
import meadow3 from "../images/meadow/1.png"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
    return (
        <>
            <Header />
            <div class="content">
              <h1 class="column-title">Thoughts of Meadow</h1>
              <p class="description">These shapes are nothing more than rectangles and lines.</p>
              <p class="description">And yet...</p>
              <p class="description">This project releases <a href="https://www.artblocks.io/collections/factory/projects/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/355">September 28th on ArtBlocks</a>.</p>
              <p class="description">See more examples and learn more about the development of 'Thoughts of Meadow' by visiting the official site.</p>
              <p class="description"><a href="https://thoughtsofmeadow.com/pages/algorithm">https://thoughtsofmeadow.com/</a></p>
              <div class="flex-grid-container">
              <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/collections/factory/projects/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/355"><img class="artImage" src={meadow1} /></a></div>
                </figure>
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/collections/factory/projects/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/355"><img class="artImage" src={meadow2} /></a></div>
                </figure>
                {/* <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/collections/factory/projects/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/355"><img class="artImage" src={meadow3} /></a></div>
                </figure> */}
                </div> 

                <h1 class="column-title">Across Paper Stones</h1>
                <p class="description">Wherever you want to go, you'll find a path to take you there.</p>
                <p class="description">Each tile is made up of two deformed rectangles. One is drawn with a drifting, fragmented outline.</p>
                <p class="description">Over thirty color palettes are shuffled together on each output, helping form slight edges between groups.</p>
                <p class="description">This project is fully minted (250 editions) and <a href="https://www.fxhash.xyz/generative/slug/across-paper-stones">available for viewing on FXHASH</a>.</p>
                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000081"><img class="artImage" src={aps1} /></a></div>
                </figure>
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000044"><img class="artImage" src={aps2} /></a></div>
                </figure>
                </div> 

                <h1 class="column-title">Chord Unknown</h1>
                <p class="description">Although I defined the mathematical parameters, every single output feels like a surprise to me.</p>
                <p class="description">There are several patterns of deformation, but at the base level this project just layers chess-like grids on top of each other. The cells stay connected, no matter how strong the deformation is.</p>
                <p class="description">This project is fully minted (500 editions) and <a href="https://www.fxhash.xyz/generative/slug/chord-unknown">available for viewing on FXHASH</a>.</p>
                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000081"><img class="artImage" src={int1} /></a></div>
                </figure>
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000044"><img class="artImage" src={int2} /></a></div>
                </figure>
                </div> 
                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000081"><img class="artImage" src={int3} /></a></div>
                </figure>
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000044"><img class="artImage" src={int4} /></a></div>
                </figure>
                </div>
                <h1 class="column-title">Masonry</h1>
                <p class="description">Deceptively simple, Masonry is one of my favorite projects to date. In it's simplest form, it's really just rectangles that have their fill color and outlines deformed. There are other random elements that lead to incredible outputs.</p>
                <p class="description">This project is fully minted (200 editions) and <a href="https://www.artblocks.io/project/259">available for viewing on ArtBlocks</a>.</p>
                {/* <p class="dscription">Read more.</p> */}
                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000081"><img class="artImage" src={mas2} /></a></div>
                </figure>
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000044"><img class="artImage" src={mas3} /></a></div>
                </figure>
                {/* <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000082"><img class="artImage" src={mas4} /></a></div>
                </figure> */}
                </div></div>
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