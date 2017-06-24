
import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { IndexLink } from 'react-router';
import { Link } from 'react-router';
import { withRouter } from 'react-router'

class CustomPostDetails extends React.Component{
	constructor(props){
		super(props);
		this.state = { priceBtnExpand : false ,externaShareExpand :false };
		}

	componentDidMount(){
		  /* facebook initialisation script   */
        if(Meteor.isClient){
	        window.fbAsyncInit = function() {
			FB.init({appId: '1616336391962335', status: true, cookie: true,
			xfbml: true});
			};

	        (function() {
				var e = document.createElement('script'); e.async = true;
				e.src = document.location.protocol +
				'//connect.facebook.net/en_US/all.js';
				document.getElementById('fb-root').appendChild(e);
				}());
        }
	}

	twitterShare(post,event){
	//	console.log("post,event",post,event)
		 window.open("https://twitter.com/share?&text="+post.title);

	}
	showSocialshareBtns(event){
		this.setState({externaShareExpand:!this.state.externaShareExpand})
	}

	showSocialshareMobile(post, event) {
		// console.log(post);
		if ((window.plugins != null ? window.plugins.socialsharing : undefined) != null) {
			options = {
				link: (window.location.href),
				subject: post.title,
				message: "",
			};
			window.plugins.socialsharing.share(options.message, options.subject, options.file, options.link);
		}
	}

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
					if(item && item.country) {
						return item.country.toLowerCase() == selectedCoutry.toLowerCase();
					}
				})
			}
		}
	//	console.log("custompost details post props",this.props.post);

		if(countryArr.length>0) {

			  countryArr.sort(function(a, b) {
		        return parseInt(a.price) - parseInt(b.price);
		      });
			return (


				<div className="ui buttons priceDropDown" onClick={()=>{ this.setState({ priceBtnExpand : !this.state.priceBtnExpand }) }}>
				  <div className="ui button" >Price : <i className={countryArr[0].currencyIcon}></i> {countryArr[0].price} </div>
				  <div className="ui floating dropdown icon button">
				    <i className="dropdown icon"></i>
				    <div className={this.state.priceBtnExpand ? "menu prices transition visible" : "menu prices"}>
				      {countryArr.map(function(country){
						    	return  <div className="item"><a target="_blank" href={country.sourceUrl}>{country.vendorName} {country.vendorName ? ": ": ""}<i className={country.currencyIcon}></i>{country.price}</a></div>
						})}
				    </div>
				  </div>
				</div>

				)
		}
	}
	render(){
		var externalShareStyle = this.state.externaShareExpand ? {
                display: 'block'
              } : {display: 'none'};

		return(
		<div className="container customPostDetails">
			<div id="fb-root"></div>
			<div className="row">

				{this.renderPrices(this.props.post)}
				<div className="posts-item-vote customVote ">
        	<Telescope.components.Vote  post={this.props.post} />
      	</div>

				{ !Meteor.isCordova ?
					<div className="socialShare">
						<div className="socialSharingBtns" style={externalShareStyle}>
							<i className="facebook icon" onClick={(e)=>{
								e.preventDefault();
								FB.ui({
									method: 'feed',
									name: this.props.post.title,
									link: (window.location.href),
									description: this.props.post.body ? this.props.post.body :"" ,
									message: ""
								});
							 }}></i>
							<i className="twitter icon" onClick={this.twitterShare.bind(this,this.props.post)}></i>
						</div>
						<div className="ui label shareIcon" onClick={this.showSocialshareBtns.bind(this)}>
						  <i className="external share icon"></i>Share
						</div>
					</div> :
					<div className="socialShare mobile-share">
						<div className="shareIcon" title="Share" onClick={this.showSocialshareMobile.bind(this, this.props.post)}>
						  <i className="external share icon"></i>
						</div>
					</div>
				}
			</div>
		</div>
		)
	}
}

export default withRouter(CustomPostDetails);

// <img src="http://res.cloudinary.com/dvrif5vdu/raw/upload/v1484234583/facebookshare_je9cm2.png"/>
// 					<img src="http://res.cloudinary.com/dvrif5vdu/raw/upload/v1484234584/twittershare_uc94yn.png"/>


// <div className="ui menu priceDropDown">
// 					  <div className="ui simple dropdown item">
// 					    Price : <i className={post.customArray11[0].currencyIcon}></i> {post.customArray11[0].price}
// 					    <i className="dropdown icon"></i>
// 					    <div className="menu prices">
// 						    {countryArr.map(function(country){
// 						    	return  <div className="item"><a target="_blank" href={country.sourceUrl}>{country.vendorName} : <i className={country.currencyIcon}></i>{country.price}</a></div>
// 						    })}
// 					    </div>
// 					  </div>
// 					</div>
