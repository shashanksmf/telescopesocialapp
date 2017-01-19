import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
import classNames from "classnames";
//import { Messages, ModalTrigger } from 'meteor/nova:core';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router'
import Users from 'meteor/nova:users';

class Country extends Component {

  renderEdit() {
    return (
      <Telescope.components.CanDo action="countries.edit.all">
        <a onClick={this.props.openModal} className="edit-country-link"><Telescope.components.Icon name="edit"/></a>
      </Telescope.components.CanDo>
    );
    // return (
    //   <ModalTrigger title="Edit Country" component={<a className="edit-country-link"><Telescope.components.Icon name="edit"/></a>}>
    //     <Telescope.componentsCountriesEditForm country={this.props.country}/>
    //   </ModalTrigger>
    // )
  }

  render() {

    const {country, index, router} = this.props;

    const currentQuery = router.location.query;
    const currentCountrySlug = router.location.query.country;
    if(!currentCountrySlug){
      router.replace({query:{ country : "uk"}});
    }
    const newQuery = _.clone(router.location.query);
    newQuery.country = country.slug;

    return (
      <div className="country-menu-item dropdown-item">
        <LinkContainer to={{pathname:router.location.pathname, query: newQuery}}>
          <MenuItem 
            eventKey={index+1} 
            key={country._id} 
          >
            {currentCountrySlug === country.slug ? <Telescope.components.Icon name="voted"/> :  null}
            {country.name}
          </MenuItem>
        </LinkContainer>
        {Users.canDo(this.context.currentUser, "countries.edit.all") ? this.renderEdit() : null}
      </div>
    )
  }
}

Country.propTypes = {
  country: React.PropTypes.object,
  index: React.PropTypes.number,
  currentCountrySlug: React.PropTypes.string,
  openModal: React.PropTypes.func
}

Country.contextTypes = {
  currentUser: React.PropTypes.object
};

module.exports = withRouter(Country);
export default withRouter(Country);