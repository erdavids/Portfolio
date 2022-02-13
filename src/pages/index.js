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

import mas1 from "../images/masonry-1.png"
import mas2 from "../images/masonry-2.png"
import mas3 from "../images/masonry-3.png"
import mas4 from "../images/masonry-4.png"
import mas5 from "../images/masonry-5.png"
import mas6 from "../images/masonry-6.png"
import mas7 from "../images/masonry-7.png"
import mas8 from "../images/masonry-8.png"
import mas9 from "../images/masonry-9.png"
import mas11 from "../images/masonry-11.png"


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
                <p class="description">Hey there, I'm a software engineer and a generative artist.</p>
                <p class="description">The coolest thing I've worked on recently is <a href="https://www.artblocks.io/project/259">Masonry</a>, which you can see some examples of below. If you want to explore the original prototype code for this project, <a href="https://github.com/erdavids/Generative-Art/tree/master/Projects/Masonry">check it out here</a>.</p>
                
                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><img class="artImage" src={mas8} /></div>
                </figure>
                <figure>
                    <div class="flex-col"><img class="artImage" src={mas9} /></div>
                </figure>
                </div>


                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><img class="artImage" src={mas7} /></div>
                </figure>
                <figure>
                    <div class="flex-col"><img class="artImage" src={mas2} /></div>
                </figure>
                </div>

                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><img class="artImage" src={mas6} /></div>
                </figure>
                <figure>
                    <div class="flex-col"><img class="artImage" src={mas4} /></div>
                </figure>
                </div>

                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><img class="artImage" src={mas5} /></div>
                </figure>
                <figure>
                    <div class="flex-col"><img class="artImage" src={mas11} /></div>
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