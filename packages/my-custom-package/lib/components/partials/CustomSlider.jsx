import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { IndexLink } from 'react-router';
import { Link } from 'react-router';
import { Carousel } from 'react-bootstrap';

class customSlider extends React.Component{
	constructor(props){
		super(props);
		this.state = {activeIndex:0,direction:null};
		this.handleSelect = this.handleSelect.bind(this);    

		if(props.post.hasOwnProperty("video")){
			if(props.post.hasOwnProperty("image")){
				var videoId = "//www.youtube.com/embed/" + this.getYoutubeId(props.post.video);
				props.post.image.push({"type":"video","url":videoId});
			}

		}	


	}

	getYoutubeId(url) {
	    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	    var match = url.match(regExp);

	    if (match && match[2].length == 11) {
	        return match[2];
	    } else {
	        return 'error';
	    }
	}
	

	
	handleSelect(index,event){
		
	var that = this;
	console.log("state : ",that.state)	
	if(event.direction=="prev"){
			if(that.state.activeIndex > 0){
				that.setState({activeIndex:that.state.activeIndex-1});
				}
			}
			else {
				if(that.state.activeIndex < that.props.post.image.length-1)
				{
					that.setState({activeIndex:that.state.activeIndex+1});
				}
			 	
			}
		}

	
	
	
	render(){
		const post = this.props.post;
		console.log("post page customSlider",post);
		var that = this;

	

		return(
			<div className="customSliderWrapper">
		    <Carousel   className="customSliderContainer" direction={that.state.direction} onSelect={that.handleSelect}>
		    	{that.props.post.image ? that.props.post.image.map(function(media,sliderIndex){
		    		 if(sliderIndex == that.state.activeIndex){
		    		return (
		    				<Carousel.Item className={" " +(sliderIndex == that.state.activeIndex ? "   " : "  " )}>
		    					{media.type == "image" ? 
		    						<div className="mediaContainer" style={{"background-image":"url("+media.url+")","background-size": "contain","height":"500px" }}></div>
		    						:''
		    					}
		    					{media.type == "video" ? 
		    						<div className="videoContainer">
		    							<iframe width="560" height="315" src={media.url} frameborder="0" allowfullscreen></iframe>
		    						</div>	
		    						:''
		    					}						        
					      	</Carousel.Item>
		    			)
		    		}
		    		else{
		    			return null;
		    		}

		    	}) : ''}

		 

   
    </Carousel>
    </div>
		)
	}
}

export default customSlider;