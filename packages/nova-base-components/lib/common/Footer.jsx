import Telescope from 'meteor/nova:lib';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

const Footer = props => {
  if (Meteor && Meteor.Device) {
    var isPhone = Meteor.Device.isPhone();
  }
  var showSearch = (props.router.location.query && props.router.location.query.showSearch && props.router.location.query.showSearch == "true") ? true : false;
  const delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

const router = props.router;

  return (
    <div className="footer">
      {isPhone ? <div className="footer-links clearfix">
        <div className="footer-item"><a href="/"><i className="fa fa-home"></i><span>Home</span></a></div>
        <div className="footer-item" onClick={()=>{
 delay(() => {
      
      router.push({ pathname:router.location.pathname, query: {showSearch:!showSearch} });
    }, 700 );
    


        }}><a><i className="fa fa-search"></i><span>Search</span></a></div>
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

module.exports = withRouter(Footer);
