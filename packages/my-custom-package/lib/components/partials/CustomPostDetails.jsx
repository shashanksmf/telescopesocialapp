
import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { IndexLink } from 'react-router';
import { Link } from 'react-router';
class CustomPostDetails extends React.Component{
	
	
	render(){
		
		return(
		<div className="container customPostDetails">
			<div className="row">
				<button className="customPostDetailsPreorder" type="button">Pre-order</button>
				<button  className="customPostDetailsSource" type="button">Source</button>
				<button  className="customPostDetailsFavbtn" type="button"><i className="fa icon plus" aria-hidden="true"></i>Favourites</button>
				<div className="socialShare">
					<img src="http://res.cloudinary.com/dvrif5vdu/raw/upload/v1484234583/facebookshare_je9cm2.png"/>
					<img src="http://res.cloudinary.com/dvrif5vdu/raw/upload/v1484234584/twittershare_uc94yn.png"/>
				</div>	
			</div>
		</div>
		)
	}
}

export default CustomPostDetails;