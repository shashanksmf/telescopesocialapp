import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class MobileShowTimingBtn extends Component { 
		

	render() { 
	  return(
         <div className="ShowTimingBtn container">
            <a href={this.props.post.producturl} target="_blank">Show Timing</a> 
        </div>
      )
  }
}
module.exports = MobileShowTimingBtn;
export default MobileShowTimingBtn;
//return (<div className="categoryBlock"><span>{category.name}</span></div>);