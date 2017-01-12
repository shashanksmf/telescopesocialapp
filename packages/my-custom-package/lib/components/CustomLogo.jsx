/*
The original Logo components is defined using React's
functional stateless component syntax, so we redefine
it the same way. 
*/

import React from 'react';
import { IndexLink } from 'react-router';

const CustomLogo = ({logoUrl, siteTitle}) => {
  return (
    <h1 className="logo-text"><IndexLink to="/">
    <img src="http://res.cloudinary.com/dvrif5vdu/image/upload/v1484229763/releasarylogo_wyc7m3.png"/>
    </IndexLink></h1>
  )
}

export default CustomLogo;