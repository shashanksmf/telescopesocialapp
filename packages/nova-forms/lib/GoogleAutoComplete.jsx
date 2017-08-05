import React, { PropTypes, Component } from 'react';

class GoogleAutoComplete extends Component {

    	constructor(props,context){
        super(props,context);
        console.log("props",props);

        this.state = { locationArr : props.value };	

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
        //console.log("fill",this.state.locationArr);
        this.state.locationArr = [];
        this.state.locationArr.push({});
        var tempArr = [];
        var place = autocomplete.getPlace();
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (this.componentForm[addressType]) {
            var val = place.address_components[i][this.componentForm[addressType]];
            this.state.locationArr[0][this.placeDetail[addressType]] = val;
            tempArr.push(val)
          }
        }

        this.state.locationArr[0]["place"] = tempArr.join(" ,");
          
     
         console.log("props value",this.state.locationArr)
        //  this.context.addToAutofilledValues({[this.props.name]: this.state.locationArr});
        //console.log("place2",place);
        this.setState({locationArr:this.state.locationArr});

        this.props.myCustomProps.updateCurrentValue(this.props.name,this.state.locationArr);

      }

      render() {
          var isArr = this.state.locationArr.constructor === Array ? true : false;
          if(!isArr) {
            this.state.locationArr = [];
            this.state.locationArr.push({});
            this.state.locationArr[0]["place"] = "";
          } 

          if(isArr && this.state.locationArr.length ==0) {
            this.state.locationArr.push({});
            this.state.locationArr[0]["place"] = "";
          }
        console.log("render",this.state.locationArr)
      		return (	<div id="locationField" className="form-group row">
				        <label className="control-label col-sm-3">{this.props.name}</label>
                <div className="col-sm-9">
                  <input id="autocompleteUserLocation" className="form-control"

                  value={
                    this.state.locationArr[0]["place"] || ""
                  } 

                  onChange={ (e)=>{ 
                    this.state.locationArr[0]["place"] = e.target.value;
                    this.setState({locationArr:this.state.locationArr}) } 
                  } 

                  ref="autoMode" placeholder="Enter your address" type="text">
    				      
                  </input>
                </div>
              </div>
			    )
  		}
	}

export default GoogleAutoComplete;

   




