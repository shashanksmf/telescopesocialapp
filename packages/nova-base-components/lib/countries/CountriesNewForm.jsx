import React, { PropTypes, Component } from 'react';
//import { Messages } from "meteor/nova:core";
import Countries from "meteor/nova:countries";
import Notifications from "meteor/nova:notification";
import NovaForm from "meteor/nova:forms";

const CountriesNewForm = (props, context) => {
  console.log(Notifications);
  return (
    <div className="countries-new-form">
      <NovaForm 
        collection={Countries} 
        methodName="countries.new"
        successCallback={(country)=>{
          context.messages.flash("Country created.", "success");
        }}
      />
    </div>
  )
}

CountriesNewForm.displayName = "CountriesNewForm";

CountriesNewForm.contextTypes = {
  currentUser: React.PropTypes.object,
  messages: React.PropTypes.object
};

module.exports = CountriesNewForm;
export default CountriesNewForm;