import React, { PropTypes, Component } from 'react';

class AutoCompleteLocation extends Component {

    	constructor(props){
        super(props);
        console.log("props",props,this.context);
        this.state = { locationArr : (props.value.constructor === Array) ? props.value : [] };	
        this.placeSearch;
        var autocomplete;

        this.componentForm = {
          locality: 'long_name',
          administrative_area_level_1: 'short_name',
          country: 'long_name'
        };  

        this.placeDetail = {
          locality:'city',
          administrative_area_level_1:'state',
          country:'country'
        }


      }

    	componentWillMount(){
        
          const script = document.createElement("script");
          script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD19U3ToWPVJpnFk7AGRT8O68qfO2sUaJ0&libraries=places";
          script.onload = (function () {
            this.initAutocomplete();
          }).bind(this)
    	   document.getElementsByTagName('head')[0].appendChild(script);
    	
      }
	
      initAutocomplete() {
        
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */
            (document.getElementById('autocompleteUserLocation')),
            {types: ['geocode']});


        autocomplete.addListener('place_changed', this.fillInAddress.bind(this));
      }

        fillInAddress() {
        // Get the place details from the autocomplete object.
        console.log(this.state.locationArr);
        var place = autocomplete.getPlace();
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (this.componentForm[addressType]) {
            var val = place.address_components[i][this.componentForm[addressType]];
         //   document.getElementById(addressType).value = val;
            
             this.state.locationArr[this.placeDetail[addressType]] = val;
            
          
          }

        }
         console.log("props value",this.state.locationArr)
        
        console.log("place2",place);
      
      }

      render() {
      		return (	<div id="locationField">
				      <input id="autocompleteUserLocation" value={this.state.locationArr.place} ref="autoMode" placeholder="Enter your address" type="text">
				      </input>
				    </div>
			    )
      		}
	}

export default AutoCompleteLocation;

   




