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

import signature from "../images/printing/signature.jpg"
import thoughts from "../images/printing/thoughts.jpg"

import bigPrint from "../images/printing/big-print.jpg"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
    return (
        <>
            <Header />
            <div class="content">
                <h1 class="column-title">Ordering Prints</h1>
                <p class="description">Art belongs wherever it can be appreciated the most.</p>
                <p class="description">I'm excited to offer an experimental printing process for owners of Masonry, Chord Unknown, Across Paper Stones, and Thoughts of Meadow.</p>
                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000081"><img class="artImage" src={signature} /></a></div>
                </figure>
                </div>
                {/* <h1 class="column-title">Why order a print?</h1> */}
                <p class="description">Physical prints allow you to celebrate your ownership and share it with others.</p>
                <p class="description">The truth is that while on-chain ownership has its advantages, a digital display will never offer the extraordinary color and detail representation that your piece deserves.</p>

                <div class="flex-grid-container">
                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000081"><img class="artImage" src={thoughts} /></a></div>
                </figure>
                </div>
                <h1 class="column-title">Printing Details</h1>
                <p class="description"></p>
                <ul>
                  <li class="description">Every order is excitedly printed, inspected, and signed by Eric Davidson.</li>
                  <li class="description">Each print will ship with an exclusive small print (7.5" x 14") representing the code of the project.</li>
                  <li class="description">Material used is a 100% cotton, 250 gsm fine-art paper.</li>
                  <li class="description">Prints will ship in protective packaging. Framing is NOT included.</li>
                  <li class="description">Editions can be printed multiple times, and will be indicated by an edition number.</li>
                </ul>
                <h1 class="column-title">Pricing and Shipping</h1>
                <p class="description">Masonry / Chord Unknown / Across Paper Stones</p>
                <ul>
                  <li class="description">Price - $150</li>
                  <li class="description">Dimensions - 16.5" x 16.5"</li>
                </ul>
                <p class="description">Thoughts of Meadow</p>

                <ul>
                <li class="description">Price - $500</li>
                <li class="description">Dimensions - 16.5" x 23.5"</li>
                </ul>
                <p class="description">Shipping will be included for deliveries within the United States. Any international orders will require an additional $250 shipping fee. Hopefully I can find a shipping option that will reduce this cost.</p>
                <h1 class="column-title">Purchasing</h1>
                <p class="description">I am actively working on setting up a process for actually ordering the prints. I am completely new to this, and it may take some time. I appreciate your patience and interest.</p>
                {/* <p class="description">I am actively experimenting with better options for accepting payments.</p>
                <p class="description">The simplest (and cheapest) method right now is to allow those interested to submit a Google form. This method involves me sending you a PayPal request for the total cost after I receive confirmation of your ownership and order.</p>
                <p class="description"><a href="https://forms.gle/teW5aq1QkDMLZhsL7">Use this form to submit your information</a>.</p>
                <p class="description">This process is constantly in development, so I appreciate your patience and interest in these projects. It means the world.</p> */}

                <figure>
                    <div class="flex-col"><a href="https://www.artblocks.io/token/259000082"><img class="artImage" src={bigPrint} /></a></div>
                </figure>
                {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScohGMAGILj27OC42y73qGIxlIlrxFPkFEamXOH1o0gb2KUaA/viewform?embedded=true" width="640" height="1537" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> */}
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