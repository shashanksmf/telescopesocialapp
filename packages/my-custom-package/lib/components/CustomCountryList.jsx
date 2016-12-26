import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Button } from 'react-bootstrap';
import Posts from "meteor/nova:posts";
//console.log("Telescope",Telescope);
class CustomCountryList extends Component{
  constructor(props){
    super(props)
    this.selectedCountry = props.selectCountry;
    console.log("props",props);
  }

  passSelectedCountry(event){
  
    var selectedIndex = event.nativeEvent.target.selectedIndex;
    var countryName = event.nativeEvent.target[selectedIndex].text;
    window.localStorage.setItem("userCountry",countryName);
    this.selectedCountry(countryName);
  }

  render() {
    var that = this;
   var countryArr = [{"name":"India","countryId":1},{"name":"USA","countryId":2},{"name":"UK","countryId":3}];
	
    // ⭐ custom code ends here ⭐

    return (
      <div className="CustomCountryList">
          <select ref="selectMark" onChange={this.passSelectedCountry.bind(this)}>
          {countryArr.map(function(country,optionIndex){
            return (
                <option key={"countryList_"+optionIndex} value={country.name} >{country.name}</option>
            )
          })}
             </select>
          
        
      
      </div>
    )
  }
};
 

export default CustomCountryList;