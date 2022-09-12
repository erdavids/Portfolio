import * as React from "react"
import '../styles/headerStyles.css'
import { Link } from "gatsby"
import {Helmet} from 'react-helmet'

const percentage = 66;

const Header = () => {

  return (
    <html lang="en">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="Designed to help you write, not edit."></meta>
        <title>Eric Davidson</title>
      </Helmet>
        <nav class="header">
            <span class="page-logo">
                {/* <Link to="/"><img class="eric-image" alt="Eric's portrait" src={Me} /></Link> */}
                <Link to="/"><span class="page-logo-title">Eric Davidson</span></Link>
            </span>
            {/* <Link to="/pricing"><button class="hidden-button login-top-link">Pricing</button></Link> */}
            {/* <Link to="/"><a class="hidden-button login-top-link">Projects</a></Link> */}
            <Link to="/about"><a class="hidden-button login-top-link">About</a></Link>
            <Link to="/blog"><a class="hidden-button login-top-link">Writing</a></Link>
            <Link to="/prints"><a class="hidden-button login-top-link">Prints</a></Link>
            <Link to="/art"><a class="hidden-button login-top-link">Art</a></Link>



        </nav>
    </html>
  )
}

export default Header
