import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Users from 'meteor/nova:users';
import Notification from 'meteor/nova:notification';
import moment from 'moment';

class MobileDateVenueList extends Component { 
	
	constructor(props) {
	    super(props);
	    
    }
// a and b are javascript Date objects
   selectDate(list,item){
//    console.log("sad",item,list);
    this.props.updateSelectedDate(list);
   }


	render() { 
   // console.log("dateVenueList");
    var that = this;
		return (

				<div className="dateVenueListPopUp flex-center">	
        <p  className="header"><label><span>Dates</span></label><span onClick={that.props.closePopUp.bind(that)} className="closeBtn">X</span></p>
				<div className="tablewrapper">	<table className="layout-fixed">
              {that.props.countryDate.map(function(list,index){
                return <tr onClick={that.selectDate.bind(that,list)} key={"listdatecountry-"+index}><td>{moment(list.reldate_local).format("MMM DD,YYYY")}</td><td>{list.country}</td></tr>
                
              })}
          </table>
        </div>
				</div>
			)
	}

}



module.exports = MobileDateVenueList;
export default MobileDateVenueList;