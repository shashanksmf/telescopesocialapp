import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { withRouter } from 'react-router';
import Telescope from 'meteor/nova:lib';

const Input = FRC.Input;

// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
const delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

class CustomSearchForm extends Telescope.components.SearchForm {

  constructor(props) {
    super(props)
    console.log("props search form",props)
   // this.search = this.search.bind(this);
    // this.state = {
    //   search: props.router.location.query.query || ''
    // }
      
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      search: this.props.router.location.query.query || ''
    });
  }

  search(data) {

    const router = this.props.router;
    const query = data.searchQuery === '' ? {} : {query: data.searchQuery};
    // if(router.location.pathname == "/" || router.location.pathname == ""){
    
    //   delay(() => {
    //   router.push({pathname: "/daily", query: query});
    // }, 700 );

    // }
    // else{

      delay(() => {

      router.push({pathname: "/", query: query});
    }, 700 );

//    }
    

  }

  render() {
    return (
      <div className="search-form">
        <Formsy.Form onChange={this.search}>
          <Input
            name="searchQuery"
            value={this.state.search}
            placeholder={this.context.intl.formatMessage({id: "posts.search"})}
            type="text"
            layout="elementOnly"
          />
        </Formsy.Form>
      </div>
    )
  }
}

CustomSearchForm.contextTypes = {
  currentRoute: React.PropTypes.object,
  currentUser: React.PropTypes.object,
  intl: intlShape
}

//module.exports = withRouter(CustomSearchForm);
export default withRouter(CustomSearchForm);