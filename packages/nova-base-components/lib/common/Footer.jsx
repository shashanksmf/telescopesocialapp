import Telescope from 'meteor/nova:lib';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { Link } from 'react-router';

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
const query = _.clone(props.router.location.query);


  return (
    <div className="footer">
      {isPhone ? <div className="footer-links clearfix">
        <div className="footer-item"><Link to="/"><i className="fa fa-home"></i><span>Home</span></Link></div>
        <div className="footer-item"><Link to="/SearchPage"><i className="fa fa-search"></i><span>Search</span></Link></div>
        <div className="footer-item"><Link to="/categoriesMenu"><i className="fa fa-cubes"></i><span>Collections</span></Link></div>
        <div className="footer-item"><Link to={{pathname:"/" , query:{...query,view:'userUpvotedPosts'}}} ><i className="fa fa-list-ul"></i><span>Watchlist</span></Link></div>
        <div className="footer-item"><Link  to={`/account`}><i className="fa fa-user"></i><span>Profile</span></Link></div>
      </div> :
        <a href="http://telescopeapp.org" target="_blank"><FormattedMessage id="app.powered_by"/></a>
      }
    </div>
  )
}
//SearchPage{pathname: "/", query: {...query, view: view}
Footer.displayName = "Footer";

module.exports = withRouter(Footer);
/*
 onClick={()=>{
 delay(() => {
      
      router.push({ pathname:router.location.pathname, query: {showSearch:!showSearch }  });
    }, 700 );
    
        }}


*/