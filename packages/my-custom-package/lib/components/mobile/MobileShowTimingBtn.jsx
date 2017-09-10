import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Currency from './../currency/currency.js';
//console.log("currencyIcon",Currency.countryCurrency)

class MobileShowTimingBtn extends Component { 
	constructor(props){
		super(props);
		this.checkIfNum = this.checkIfNum.bind(this);

		var that = this;
		if(Array.isArray(props.dateMatchArr) && props.dateMatchArr.length > 0) {
			that.priceArr =[],
				countryIcon ="";
			props.dateMatchArr.forEach(function(currentObj) {
				if(currentObj.hasOwnProperty("price")) {
					if(that.checkIfNum(currentObj.price)) {
						that.priceArr.push(currentObj);
					}
				}
			}) 
		}

		var countryCurrency = Currency.countryCurrency;
		if(Array.isArray(that.priceArr) && that.priceArr.length > 0 && that.priceArr[0].hasOwnProperty("country")) {
			var countryLenIndex = that.priceArr[0].country.split(",").length;
			var countryName =  that.priceArr[0].country.split(",")[countryLenIndex-1].trim().toLowerCase();

			for(var i=0;i<countryCurrency.length;i++) {
				//console.log("for loop",countryCurrency[i],countryName);
				if(countryName == countryCurrency[i].countryName.trim().toLowerCase()) {
					currencyIcon = countryCurrency[i].currencyIcon;
				}
			}
		
		}
		that.priceArr && that.priceArr.length > 1 && that.priceArr.sort(function(a,b){
			if(a.hasOwnProperty("price") && b.hasOwnProperty("price")) {
				return a.price - b.price;
			}	
		});
	//	console.log("props dateMatchArr",props.dateMatchArr,that.priceArr,currencyIcon);



	}
		
	checkIfNum(param){
		return !Number.isNaN(Number.parseInt(param.trim()));
	}

	render() { 
		var showTimeTxt = "ShowTimes";
		if(this.props.post.hasOwnProperty("postType") && this.props.post.postType == "Product" &&
			(this.priceArr[0].hasOwnProperty("price") || this.priceArr[1].hasOwnProperty("price"))) {
			if(this.priceArr.length > 1) {
			    showTimeTxt = currencyIcon + " " + this.priceArr[0].price + "-" + this.priceArr[1].price;
			}
			else {
				showTimeTxt = currencyIcon + this.priceArr[0].price;
			}
		}
		 
	  return(
         <div className="ShowTimingBtn container">
            <a href={this.props.post.producturl} target="_blank">{showTimeTxt}</a> 
        </div>
      )
  }
}
module.exports = MobileShowTimingBtn;
export default MobileShowTimingBtn;
//return (<div className="categoryBlock"><span>{category.name}</span></div>);