
import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import Posts from "meteor/nova:posts";

import { withRouter } from 'react-router';

class SocialShare extends Component { 
	
	constructor(props){
		super(props);
		this.state = { externaShareExpand :false };
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

	render () {

		var externalShareStyle = this.state.externaShareExpand ? {
                display: 'block'
              } : {display: 'none'};

		return (
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
			</div>

			)

	}

}


module.exports = withRouter(SocialShare);

export default withRouter(SocialShare);
