/*
The original Logo components is defined using React's
functional stateless component syntax, so we redefine
it the same way. 
*/

import React from 'react';
import { IndexLink } from 'react-router';

const CustomLogo = ({logoUrl, siteTitle}) => {
  var isPhone;

  if(Meteor && Meteor.Device){
     isPhone = Meteor.Device.isPhone()
  }

    if(!isPhone){
      return(
       <h1 className="logo-text"><IndexLink to="/">
          <img src="http://res.cloudinary.com/dvrif5vdu/image/upload/v1484229763/releasarylogo_wyc7m3.png"/>
          </IndexLink></h1>
        )
    }
  	else if (logoUrl) {
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
        <IndexLink to={{pathname: "/"}}>{siteTitle}</IndexLink>
      </h1>
    )
  }
   
}

export default CustomLogo;
/*
 <h1 className="logo-text"><IndexLink to="/">
    <img src="http://res.cloudinary.com/dvrif5vdu/image/upload/v1484229763/releasarylogo_wyc7m3.png"/>
    </IndexLink></h1>
*/