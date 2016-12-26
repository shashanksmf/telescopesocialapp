import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import NovaForm from "meteor/nova:forms";
import { DocumentContainer } from "meteor/utilities:react-list-container";
import Countries from "meteor/nova:countries";

class CountriesEditForm extends Component{

  constructor() {
    super();
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  deleteCategory() {
    const country = this.props.country;
    if (window.confirm(`Delete country “${country.name}”?`)) { 
      this.context.actions.call("countries.deleteById", country._id, (error, result) => {
        if (error) {
          this.context.messages.flash(error.message, "error");
        } else {
          this.context.messages.flash(`Category “${country.name}” deleted and removed from ${result} posts.`, "success");
        }
        this.context.closeCallback();
      });
    }
  }

  render() {

    return (
      <div className="countries-edit-form">
        <NovaForm 
          document={this.props.country}
          collection={Countries}
          methodName="countries.edit"
          successCallback={(country)=>{
            this.context.messages.flash("Category edited.", "success");
          }}
        />
        <hr/>
        <a onClick={this.deleteCategory} className="countries-delete-link"><Telescope.components.Icon name="close"/> <FormattedMessage id="countries.delete"/></a>
      </div>
    )
  }
}

CountriesEditForm.propTypes = {
  country: React.PropTypes.object.isRequired
}

CountriesEditForm.contextTypes = {
  actions: React.PropTypes.object,
  closeCallback: React.PropTypes.func,
  currentUser: React.PropTypes.object,
  messages: React.PropTypes.object,
};

module.exports = CountriesEditForm;
export default CountriesEditForm;