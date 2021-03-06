import React, { PropTypes, Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
// import { GoogleAutoComplete } from 'meteor/my-google-complete';
import GoogleAutoComplete from "./GoogleAutoComplete.jsx";

const UsersAccountForm = () => {
  return (
    <Accounts.ui.LoginForm />
  )
};

module.exports = UsersAccountForm;
export default UsersAccountForm;

// customize Accounts.ui
// mt customize start
var locationObj = {};

class AccountsForm extends Accounts.ui.LoginForm {
  fields() {
    const { formState } = this.state;
    if (formState == STATES.SIGN_UP) {
      return {
        fullName: {
          id: 'fullName',
          hint: 'Enter Fullname',
          label: 'Fullname',
          onChange: this.handleChange.bind(this, 'fullName')
        },
        ...super.fields(),
        location: {
          id: 'location',
          label: 'Location',
          type: [Object],
          onChange: this.handleChange.bind(this, 'location'),
          updateCurrentValue: this.updateCurrentValue.bind('location')
        }
      };
    }
    return super.fields();
  }

  signUp(options = {}) {
    const { fullName = null } = this.state;
    if (fullName !== null) {
      options.profile = Object.assign(options.profile || {}, {
        fullName: fullName
      });
    }
    if (locationObj !== null) {
      options.profile = Object.assign(options.profile || {}, {
        location: locationObj
      });
    }
    super.signUp(options);
  }

  updateCurrentValue (field, value) {
    locationObj = value;
    // super.setState({ location: value });
    // super.setDefaultFieldValues({ location: value });
  }
}
// End
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
  onSignedInHook: () => {},
  onSignedOutHook: () => {},
});

class AccountsButton extends Accounts.ui.Button {
  render () {
    const {label, href, type, disabled, className, onClick} = this.props;
    if (type === 'link') {
      return <a href={ href } className={ className } onClick={ onClick }>{ label }</a>;
    }
    return <Button
        bsStyle="primary"
        className={ className }
        type={ type } 
        disabled={ disabled }
        onClick={ onClick }>{ label }
      </Button>;
  }
}

class AccountsField extends Accounts.ui.Field {

  // see https://github.com/studiointeract/accounts-ui/issues/60
  triggerUpdate () {
    const { onChange } = this.props
    if (this.input) {
      onChange({ target: { value: this.input.value } })
    }
  }

  render() {
    if (Meteor && Meteor.Device) {
      var isPhone = Meteor.Device.isPhone();
    }
    const { id, hint, label, type = 'text', onChange, className = "field", defaultValue = "", updateCurrentValue } = this.props;
    const { mount = true } = this.state

    const base = this.props;
    const properties = {
      ...base
    };
    return mount ? (
      <div className={ className }>
        { isPhone ?
          <label className="input-name"><i className={"fa fa-" + id}></i></label>
          : ''
        }
        { id === 'location' ? <GoogleAutoComplete {...properties} myCustomProps={this.props} />
        :
          <FormControl id={ id } type={ type } onChange={ onChange } placeholder={ hint } defaultValue={ defaultValue } />
        }
      </div>
    ) : null;
  }
}

// class AccountsSocialButtons extends Accounts.ui.SocialButtons {
//   render () {
//     let { oauthServices = {}, className = "social_buttons" } = this.props;
//     return(
//       <div className={ className }>
//         {Object.keys(oauthServices)
//           .filter(service => oauthServices[service].disabled) // filter services registered but not enabled
//           .map((id, i) => <Accounts.ui.Button {...oauthServices[id]} key={i} />)}
//       </div>
//     );

//   }
// }

// class AccountsPasswordOrService extends Accounts.ui.PasswordOrService {
//   render () {
//     let {
//       oauthServices = {},
//       className,
//       style = {}
//       } = this.props;
//     let { hasPasswordService } = this.state;
//     let labels = Object.keys(oauthServices)
//       .filter(service => oauthServices[service].disabled) // filter services registered but not enabled
//       .map(service => oauthServices[service].label);
//     if (labels.length > 2) {
//       labels = [];
//     }

//     if (hasPasswordService && labels.length > 0) {
//       return (
//         <div style={ style } className={ className }>
//           { `${T9n.get('or use')} ${ labels.join(' / ') }` }
//         </div>
//       );
//     }
//     return null;
//   }
// }

Accounts.ui.Button = AccountsButton;
Accounts.ui.Field = AccountsField;
Accounts.ui.LoginForm = AccountsForm;
// Accounts.ui.SocialButtons = AccountsSocialButtons;
// Accounts.ui.PasswordOrService = AccountsPasswordOrService;
