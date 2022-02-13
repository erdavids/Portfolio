import React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"
import "../styles/blogListStyles.css"
import PostLink from "../components/post-link"
import PostFull from "../components/post-full"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink class="post-link" key={edge.node.id} post={edge.node} />)

    const FullPosts = edges
    .filter(edge => !!edge.node.frontmatter.date )
    .map(edge => <PostFull class="post-link-full" key={edge.node.id} post={edge.node} />)

    const ArtPosts = edges
    .filter(edge => !!edge.node.frontmatter.date && edge.node.frontmatter.art)
    .map(edge => <PostLink class="post-link" key={edge.node.id} post={edge.node} />)

    return (
        <>
            <Header />
            <div class="content">
              <p class="description">When I'm not making web applications with code, I like making art.</p>
              <p class="description">There's just something about generative art that brings me back over and over. I really love problem solving, and thinking through a potential generative project eventually becomes a technical challenge. You can visualize it, and you can make it statically by hand somehow, but you become interested in unleashing the idea completely and letting it make itself. Each stage of the process has it's own difficulties and it's own rewards.</p>
              <p class="description">I like doing other things as well. I've recently gotten in to woodworking, but only with handtools. I also love fitness and spending time outside.</p>
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