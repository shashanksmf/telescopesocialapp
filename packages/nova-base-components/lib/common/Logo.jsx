import React from 'react';
import { IndexLink , Link} from 'react-router';

const Logo = ({logoUrl, siteTitle}) => {
  if (logoUrl) {
    return (
      <h1 className="logo-image ">
        <IndexLink to={{pathname: "/"}}>
          <img src={logoUrl} alt={siteTitle} style={{maxWidth: "100px", maxHeight: "100px"}} />
        </IndexLink>
      </h1>
    )
  } else {
    return (
      <h1 className="logo-text">
        <Link to={{pathname: "/"}}>{siteTitle}</Link>
      </h1>
    )
  }
}

Logo.displayName = "Logo";

module.exports = Logo;