
import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { IndexLink } from 'react-router';
import { Link } from 'react-router';
import { withRouter } from 'react-router'

class CustomPostDetails extends React.Component{

	renderPrices(post){
		
		const currentQuery = _.clone(this.props.router.location.query);
		var selectedCoutry;

		var countryArr = [];
		
		if(currentQuery && currentQuery.country){
			selectedCoutry = currentQuery.country;
		}
		else if(Meteor.isClient && localStorage.getItem("userCountry")){ 
			selectedCoutry = localStorage.getItem("userCountry");	
		}

		if(selectedCoutry){
			if(post.hasOwnProperty("customArray11")) {
				countryArr = post.customArray11.filter(function(item){
					return item.country.toLowerCase() == selectedCoutry.toLowerCase();
				})
			}
		}
		console.log("custompost details post props",countryArr,currentQuery,selectedCoutry);
		
		if(countryArr.length>0) {
			return ( 

				<div className="ui compact menu priceDropDown">
					  <div className="ui simple dropdown item">
					    Price : <i className={post.customArray11[0].currencyIcon}></i> {post.customArray11[0].price}
					    <i className="dropdown icon"></i>
					    <div className="menu">
						    {countryArr.map(function(country){
						    	return  <div className="item">{country.vendorName} : {country.price}</div>
						    })}
					    </div>
					  </div>
					</div>
				)
		}
	}
	render(){
		 
		return(
		<div className="container customPostDetails">
			<div className="row">
				<button className="customPostDetailsPreorder" type="button">Pre-order</button>
				<button  className="customPostDetailsSource" type="button">Source</button>
				
				{this.renderPrices(this.props.post)}
				
				<button  className="customPostDetailsFavbtn" type="button"><i className="fa icon plus" aria-hidden="true"></i>Favourites</button>
				<div className="socialShare">
					<i className="facebook icon"></i>
					<i className="twitter icon"></i>
				</div>	
			</div>
		</div>
		)
	}
}

export default withRouter(CustomPostDetails);

// <img src="http://res.cloudinary.com/dvrif5vdu/raw/upload/v1484234583/facebookshare_je9cm2.png"/>
// 					<img src="http://res.cloudinary.com/dvrif5vdu/raw/upload/v1484234584/twittershare_uc94yn.png"/>