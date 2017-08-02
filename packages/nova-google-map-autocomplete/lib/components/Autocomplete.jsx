import React, { PropTypes, Component } from 'react';

class AutoCompleteLocation extends Component {

    	constructor(props,context){
        super(props,context);
        console.log("props",props,context);
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
        this.state.locationArr = [];
        var tempArr = [];
        var place = autocomplete.getPlace();
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (this.componentForm[addressType]) {
            var val = place.address_components[i][this.componentForm[addressType]];
            this.state.locationArr[this.placeDetail[addressType]] = val;
            tempArr.push(val)
          }
        }

        this.state.locationArr["place"] = tempArr.join(" ,");
          
     
         console.log("props value",this.state.locationArr,this.props,this.context)
        //  this.context.addToAutofilledValues({[this.props.name]: this.state.locationArr});
        console.log("place2",place);
      this.setState({locationArr:this.state.locationArr});
      }

      render() {
        console.log("render",this.state.locationArr)
      		return (	<div id="locationField" className="form-group row">
				      <input id="autocompleteUserLocation" value={this.state.locationArr["place"]} onChange={ (e)=>{ this.setState({locationArr:e.target.value}) } } ref="autoMode" placeholder="Enter your address" type="text">
				      </input>
              <input  type="text" name={"telescope.location"} datatype={this.props.datatype} value="New city"/>
				    </div>
			    )
  		}
	}

export default AutoCompleteLocation;

   




