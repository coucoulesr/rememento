import React from "react";
import { Link } from "react-router-dom";
import {
  navStyles,
  logoStyles,
  linkStyles,
  navLinkStyles,
} from "./styles/splash-styles";

class SplashNav extends React.Component {
  render() {
    return (
      <div style={navStyles}>
        <span style={logoStyles}>
          <Link style={linkStyles} to="/">
            rememento
          </Link>
        </span>
        <span className="splash-nav-link" style={navLinkStyles}>
          <Link style={linkStyles} to="/login">
            Sign In
          </Link>
        </span>
      </div>
    );
  }
}

export default SplashNav;
