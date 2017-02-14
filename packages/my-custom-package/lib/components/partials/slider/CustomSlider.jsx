import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { IndexLink } from 'react-router';
import { Link } from 'react-router';
if(Meter.isClient){
	require ("./slider/slider.min.js");

}
class customSlider extends React.Component{
	
	
	render(){
		const post = this.props.post;
		console.log("post page customSlider",post);
		return(
		<div className="customSlider">	
		    <div className="swiper-container">
	        <div className="swiper-wrapper">
	            <div className="swiper-slide">Slide 1</div>
	            <div className="swiper-slide">Slide 2</div>
	            <div className="swiper-slide">Slide 3</div>
	            <div className="swiper-slide">Slide 4</div>
	            <div className="swiper-slide">Slide 5</div>
	            
	        </div>
	        <div className="swiper-pagination"></div>
	    
	        <div className="swiper-button-next"></div>
	        <div className="swiper-button-prev"></div>
	    </div>
    </div>
		)
	}
}

export default customSlider;