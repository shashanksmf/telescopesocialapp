import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Dropdown, Button } from 'react-bootstrap';

const UsersAccountMenu = () => {
  if (Meteor && Meteor.Device) {
    var isPhone = Meteor.Device.isPhone();
  }

  var handleCancel = function (event) {
    $('#accounts-dropdown').click();
  }

  return (
    <Dropdown id="accounts-dropdown" className="users-account-menu">
      <Dropdown.Toggle>
        <FormattedMessage id="users.log_in"/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {isPhone ?
          <div className="login-header">
            <span className="close-menu" onClick={() => handleCancel(this)}><i className="fa fa-angle-left"></i></span>
          </div>
          : ''
        }
        <Telescope.components.UsersAccountForm />
      </Dropdown.Menu>
    </Dropdown>
  )
};

UsersAccountMenu.displayName = "UsersAccountMenu";

module.exports = UsersAccountMenu;
export default UsersAccountMenu;
