import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { IndexLink } from 'react-router';
import { Link } from 'react-router';
import { Carousel } from 'react-bootstrap';

class customSlider extends React.Component{
	constructor(props){
		super(props);
		this.state = {activeIndex:0,direction:null};
		this.handleSelect = this.handleSelect.bind(this)    


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
				if(that.state.activeIndex < that.props.post.image.length)
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
		    <Carousel activeIndex={that.state.activeIndex+1}  className="customSliderContainer" direction={that.state.direction} onSelect={that.handleSelect}>
		    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
		  
		    	{that.props.post.image.map(function(media,sliderIndex){
		    		return (
		    				<Carousel.Item className={" " +(sliderIndex == that.state.activeIndex ? " " : " " )}>
		    					{media.type == "image" ? 
		    						<div className="mediaContainer" style={{"background-image":"url("+media.url+")","background-size": "contain","height":"500px" }}></div>
		    						
		    						:''
		    					}
		    					{media.type == "video" ? 
		    						<div className="mediaContainer" style={{"height":"auto"}} dangerouslySetInnerHTML={{ __html: media.url }}></div>
		    						
		    						:''
		    					}						        
					      	</Carousel.Item>
		    			)

		    	})}

		 

   
    </Carousel>

		)
	}
}

export default customSlider;