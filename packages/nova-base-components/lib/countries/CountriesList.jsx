import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, DropdownButton, MenuItem, Modal } from 'react-bootstrap';
import { /* ModalTrigger, */ ContextPasser } from "meteor/nova:core";
import { withRouter } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';
import Users from 'meteor/nova:users';

// note: cannot use ModalTrigger component because of https://github.com/react-bootstrap/react-bootstrap/issues/1808

class CountriesList extends Component {

  constructor() {
    super();
    this.openCountryEditModal = this.openCountryEditModal.bind(this);
    this.openCountryNewModal = this.openCountryNewModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      openModal: false
    }
  }

  openCountryNewModal() {
    // new country modal has number 0
    this.setState({openModal: 0});
  }

  openCountryEditModal(index) {
    // edit country modals are numbered from 1 to n
    this.setState({openModal: index+1});
  }

  closeModal() {
    this.setState({openModal: false});
  }

  renderCountryEditModal(country, index) {
    return (
      <Modal key={index} show={this.state.openModal === index+1} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="countries.edit"/></Modal.Title>
        </Modal.Header>        
        <Modal.Body>
          <ContextPasser currentUser={this.context.currentUser} messages={this.context.messages} actions={this.context.actions} closeCallback={this.closeModal}>
            <Telescope.components.CountriesEditForm country={country}/>
          </ContextPasser>
        </Modal.Body>
      </Modal>
    )
  }

  renderCountryNewModal() {
    
    return (
      <Modal show={this.state.openModal === 0} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="countries.new"/></Modal.Title>
        </Modal.Header>        
        <Modal.Body>
          <ContextPasser currentUser={this.context.currentUser} messages={this.context.messages} closeCallback={this.closeModal}>
            <Telescope.components.CountriesNewForm/>
          </ContextPasser>
        </Modal.Body>
      </Modal>
    )
  }

  renderCountryNewButton() {
    return (
      <Telescope.components.CanDo action="countries.new">
        <div className="country-menu-item dropdown-item"><MenuItem><Button bsStyle="primary" onClick={this.openCountryNewModal}><FormattedMessage id="countries.new"/></Button></MenuItem></div>
      </Telescope.components.CanDo>
    );
    // const CountriesNewForm = Telescope.components.CountriesNewForm;
    // return (
    //   <ModalTrigger title="New Country" component={<MenuItem className="dropdown-item post-country"><Button bsStyle="primary">New Country</Button></MenuItem>}>
    //     <CountriesNewForm/>
    //   </ModalTrigger>
    // )
  }

  render() {
    
    const countries = this.props.countries;
    const router    = this.props.router;
    const context = this.context;
    const currentQuery = _.clone(this.props.router.location.query);
   // currentQuery.country = 'all';
   if(!currentQuery && !currentQuery.country){
      currentQuery.country = "uk";
   }
    var selectedCountry; 
     if(currentQuery.country && countries){
      for(var i=0;i<countries.length;i++){
        if(countries[i].name.toLowerCase() == currentQuery.country.toLowerCase()){
          selectedCountry = countries[i].name;
        } 
      }
    }

   // console.log(countries);
    //delete currentQuery.country;
    return (
      <div>
        <DropdownButton 
          bsStyle="default" 
          className="countries-list btn-secondary" 
          title={selectedCountry || <FormattedMessage id="countries"/>} 
          id="countries-dropdown"
          onSelect={function() {}}
        >
          <div className="country-menu-item dropdown-item">
            <LinkContainer to={{pathname:router.location.pathname, query: currentQuery}}>
              <MenuItem eventKey={0}>
                <FormattedMessage id="countries.all"/>
              </MenuItem>
            </LinkContainer>
          </div>
          {countries && countries.length > 0 ? countries.map((country, index) => <Telescope.components.Country key={index} country={country} index={index} openModal={_.partial(this.openCountryEditModal, index)}/>) : null}
          {this.renderCountryNewButton()}
        </DropdownButton>
        <div>
          {/* modals cannot be inside DropdownButton component (see GH issue) */}
          {countries && countries.length > 0 ? countries.map((country, index) => this.renderCountryEditModal(country, index)) : null}
          {this.renderCountryNewModal()}
        </div>
      </div>
    )

  }
};

CountriesList.propTypes = {
  countries: React.PropTypes.array
}

CountriesList.contextTypes = {
  actions: React.PropTypes.object,
  currentUser: React.PropTypes.object,
  messages: React.PropTypes.object,
};

module.exports = withRouter(CountriesList);
export default withRouter(CountriesList);