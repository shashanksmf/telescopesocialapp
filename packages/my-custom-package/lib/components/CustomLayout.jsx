import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FlashContainer } from "meteor/nova:core";
import CustomPostsCategories from './CustomPostsCategories.jsx';

//import CustomCountryList from './CustomCountryList.jsx';

class CustomLayout extends Component {
//   constructor(){
//       super();
//       this.state = {countrySelected:''};
//   }


//   handleCountry(country){
//     console.log("country sle",country,this);
//     this.state.countrySelected = country;
//     this.setState({countrySelected:this.state.countrySelected});
//   }
    componentWillMount() {
      //this.setState({countrySelected:this.state.countrySelected});
      var push_username = '@Test';
      var push_message = 'Test message';
      Meteor.call("sendPushNotification", push_username, push_message, (error, result) => {
        if(error) {
          console.log(error);
        } else {
          console.log(result);
        }
      });
    }

  render() {

    return (
      <div className="wrapper" id="wrapper">

        <Telescope.components.HeadTags />

        <Telescope.components.UsersProfileCheck {...this.props} />



        <Telescope.components.Header {...this.props}/>

        <div className="main">

          <FlashContainer component={Telescope.components.FlashMessages}/>

          <Telescope.components.Newsletter {...this.props}/>

          <div className="childrenWrapper">
              {this.props.children}
             <div className="CustomCategoriesContainer">
                  <div className="customCategoriesWrapper">
                      <CustomPostsCategories/>
                  </div>
              </div>
          </div>


        </div>

        <Telescope.components.Footer {...this.props}/>

      </div>
    )

  }
}



export default CustomLayout;
/* <!-- {this.props.children} -->
<div className="customLayoutCategoriesBlock">
				<Telescope.components.Categories  />

			</div>
               {React.cloneElement(this.props.children, { userCountry: this.state.countrySelected })}

 <CustomCountryList selectCountry={this.handleCountry.bind(this)}/>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>


      */
