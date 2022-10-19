import React from "react";
import "../styles/Landingpage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
    <>
      <div id="container-landing-page">
        <div className="nav">
          <div className="nav-items">
            <img
              className="nav-logo"
              src="/images/winkeat-logo.png"
              alt="not available"
            />
            <i>
              <li className="nav-buttons">
              <Link to="login">
                <button className="signin-btn">Sign In</button>
              </Link>
              <Link to="register">
                <button className="signup-btn">Sign Up</button>
              </Link>
              </li>
            </i>
          </div>
        </div>
        <body className="landingPage-body">
          <p className="winkeat-typo">
            <span className="winkeat">Winkeat</span><br/>
            <span className="winkeat-quote">Get your </span><br/>
            <span className="winkeat-quote">food ready</span><br/>
            <span className="winkeat-quote">before you</span><br/>
            <span className="winkeat-quote">reach</span>
          </p>
          <img className="winkeat-home-img" src="/images/winkeat-landing-img2.png" alt="Not available" />
        </body>
        <footer className="landing-page-footer">
          <p><Link to="/vendorlogin">Login </Link>as Vendor</p>
          <p>Let's enhance your business <Link to="/contact">Contact Us </Link></p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
