import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { IndexLink } from 'react-router';
import { Link } from 'react-router';
class HunterMaker extends React.Component{
	
	
	render(){
		const post = this.props.post;
		console.log("post page",post)
		const makerProfileUrl = "/users/"+post.user.username;
		return(
		<div className="container makerHunter">
			<div className="row">
				<div className="hunter">
					<span className="hunterHarcodeText">
						Hunter
					</span>
					<div className="noHunterText">
						Currently there are no Hunters
					</div>
				</div>
				<div className="maker">
					<div className="makerHarcodeText">
					Maker
					</div>
					{post.thumbnailUrl ? <Telescope.components.PostsThumbnail post={post}/> : <img className="makerPic" src="https://secure.gravatar.com/avatar/89044d6601a348c5cfcd09466681ab08?size=200&default=mm"/>}
					<span className="makerUserName">
						 <Link to={makerProfileUrl} className="posts-item-title-link makerUserName" >
							<span className="makerProfileLink">{post.user.username}</span>
						</Link>
					</span>
					
				</div>
			</div>
		</div>
		)
	}
}

export default HunterMaker;