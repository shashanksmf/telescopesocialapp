import Telescope from 'meteor/nova:lib';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Footer = props => {
  if (Meteor && Meteor.Device) {
    var isPhone = Meteor.Device.isPhone();
  }

  return (
    <div className="footer">
      {isPhone ? <div className="footer-links clearfix">
        <div className="footer-item"><a href="/"><i className="fa fa-home"></i><span>Home</span></a></div>
        <div className="footer-item"><a href="#"><i className="fa fa-search"></i><span>Search</span></a></div>
        <div className="footer-item"><a href="#"><i className="fa fa-cubes"></i><span>Collections</span></a></div>
        <div className="footer-item"><a href="#"><i className="fa fa-list-ul"></i><span>Watchlist</span></a></div>
        <div className="footer-item"><a href="/account"><i className="fa fa-user"></i><span>Profile</span></a></div>
      </div> :
        <a href="http://telescopeapp.org" target="_blank"><FormattedMessage id="app.powered_by"/></a>
      }
    </div>
  )
}

Footer.displayName = "Footer";

module.exports = Footer;
