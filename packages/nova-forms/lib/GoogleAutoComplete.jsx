import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';

class GoogleAutoComplete extends Component {

    	constructor(props,context){
        super(props,context);
  console.log("props context",props,context)
     
        this.state = { location:"", locationArr : props.value || [] };	

        this.placeSearch;

        this.componentForm = {
          locality: 'long_name',
          administrative_area_level_1: 'short_name',
          country: 'long_name'
        };  

        this.placeDetail = ['city','country'];
        }


    

      componentDidUpdate(){
          var that = this;
          document.onclick= function(event) {
            console.log("onclick document");
            that.setState({locationArr:[]}) 
           }
      }

      searchPlace(event) {
        var that = this;
        that.setState({ location : event.target.value });
        if(event.target.value.length > 1) {
          Meteor.call('getGooglePlaces',event.target.value,function(err,result){
            if(!err && result.statusCode == 200 && result.data.status == "OK") {
              that.setState({ locationArr : result.data.predictions })
            }
          //  console.log("client call",err,result)
          })
        }

      }

      selectLocality(locality) {
        var placeArr = [];
        
        switch(locality.terms.length) {
          case 1:
            placeArr.push({ 'country': locality.terms[0].value });
          break;

          case 2:
            placeArr.push({ 'city': locality.terms[0].value , 'country': locality.terms[1].value });
          break;

          case 3:
            placeArr.push({ 'city': locality.terms[0].value , 'state': locality.terms[1].value , 'country': locality.terms[2].value });
          break;

        }

        this.setState({ location : locality.description  })
        
        this.props.myCustomProps.updateCurrentValue(this.props.name,placeArr);

      }

    

      render() {
          var that = this;     
      		return (	<div id="locationField" className="form-group row">
				        <label className="control-label col-sm-3">{that.props.name}</label>
                <div className="col-sm-9 googleAutocompelte">
                  <input ref={that.state.locationId} id={that.state.locationId} className="form-control"

                  value={ that.state.location } 

                  onChange={  that.searchPlace.bind(that) } 

                  ref="autoMode" placeholder="Enter your address" type="text">
    				      
                  </input>
                  <ul className={that.state.locationArr.length > 0 ? "list active" : "list"}>
                    { that.state.locationArr.length > 1 ? 
                      that.state.locationArr.map(function(item,index){
                        return <li key={"autocompletelist-"+index} onClick={ that.selectLocality.bind(that,item) }>{ item.description }</li> 
                      })
                      : null
                    }
                    
                  </ul>
                </div>
              </div>
			    )
  		}
	}

export default GoogleAutoComplete;

   




