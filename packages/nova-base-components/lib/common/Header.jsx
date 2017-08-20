import Telescope from 'meteor/nova:lib';
import React from 'react';
import CustomNotificationList from './CustomNotificationList.jsx';
//import { Messages } from "meteor/nova:core";

const Header = (props, {currentUser}) => {

  const logoUrl = Telescope.settings.get("logoUrl");
  const siteTitle = Telescope.settings.get("title", "Nova");
  const tagline = Telescope.settings.get("tagline");
  if (Meteor && Meteor.Device) {
    var isPhone = Meteor.Device.isPhone();
  }

  return (
    <div className="header-wrapper">

      <header className="header">

        <div className="logo">
          <Telescope.components.Logo logoUrl={logoUrl} siteTitle={siteTitle} />
          {tagline ? <h2 className="tagline">{tagline}</h2> : "" }
        </div>
        <CustomNotificationList/>
        <div className="nav nav-head">

          <div className="nav-user">
            {currentUser ? <Telescope.components.UsersMenu/> : <Telescope.components.UsersAccountMenu/>}
          </div>

          {isPhone ? <div className="header-bar">
            <i className="fa fa-bars"></i>
          </div> :
          <div className="nav-new-post">
            <Telescope.components.PostsNewButton/>
          </div> }

        </div>
         {isPhone ?
        <div className="mt-row mobile-top-menu clearfix">
          <ul className="mobile-nav">
            <li className={ (props.router.location.pathname == "/" && (!props.router.location.query.view)) ? "active"  : "" }><Link to="/"><span>New</span></Link></li>
            <li className={ props.router.location.pathname == "/daily" ? "active" : "" }><Link to="/daily"><span>By Date</span></Link></li>
            <li className={ props.router.location.query.view == "userUpvotedPosts" ? "active" : "" }><Link to={{pathname:"/" , query:{...query,view:'userUpvotedPosts'}}} ><span>Popular</span></Link></li>
            <li className={ props.router.location.query.view == "Random" ? "active" : "" }><Link to={{pathname:"/" , query:{...query,view:'Random'}}} ><span>Random</span></Link></li>
          </ul>
        </div>
        : null }

      </header>
    </div>
  )
}

Header.displayName = "Header";

Header.contextTypes = {
  currentUser: React.PropTypes.object,
};

module.exports = Header;
