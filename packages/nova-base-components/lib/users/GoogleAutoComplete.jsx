import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';

class GoogleAutoComplete extends Component {
    constructor(props,context) {
        super(props,context);
        //console.log("props context",props,context)
        var locationId;
        if(Array.isArray(props.value) && props.value.length > 0 && props.value[0].hasOwnProperty('place')) {
            place = props.value[0].place;
        } else {
            place = props.value || "";
        }

        this.state = { location: place || "", locationArr : [] };

        this.placeSearch;

        this.componentForm = {
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name'
        };

        this.placeDetail = ['city','country'];
    }

    componentDidUpdate() {
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
        placeArr[0]["place"] = "";
        locality.terms.forEach(function(items,index) {
            placeArr[0]["place"] +=  (index == locality.terms.length -1) ? items.value : items.value + ", ";
        })

        if(this.props.hasOwnProperty("savecountry")) {
            this.props.savecountry({'name':placeArr[0]["country"]} , this.props.savecountryindex ,this)
        } else {
            console.log("in else",this.props);
            this.props.myCustomProps.updateCurrentValue(this.props.name, placeArr);
        }
        this.setState({ location : locality.description ,locationArr: []  });
    }
    render() {
        var that = this;
        return (
            <div className="googleAutocompelte ui input">
                <input className="form-control" value={ that.state.location } onChange={  that.searchPlace.bind(that) } placeholder="Enter your address" type="text"></input>
                <ul className={that.state.locationArr.length > 0 ? "list active" : "list"}>
                    { that.state.locationArr.length > 1 ?
                        that.state.locationArr.map(function(item,index) {
                            return <li key={"autocompletelist-"+index} onClick={ that.selectLocality.bind(that,item) }>{ item.description }</li>
                        })
                        : null
                    }
                </ul>
            </div>
        )
    }
}

export default GoogleAutoComplete;
