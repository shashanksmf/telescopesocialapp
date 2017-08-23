import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FlashContainer } from "meteor/nova:core";
import CustomPostsCategories from './CustomPostsCategories.jsx';
import { withRouter } from 'react-router';

//import CustomCountryList from './CustomCountryList.jsx';

class CustomLayout extends Component {

  componentDidMount(){
    
    if (Meteor && Meteor.Device && Meteor.Device.isPhone()) {
        var headerHt = document.getElementsByClassName("header-wrapper")[0].clientHeight;
        var windowHt = window.innerHeight;
        var footerHt = document.getElementsByClassName("footer-links")[0].clientHeight;
        document.getElementsByClassName("main")[0].style.height = windowHt - headerHt - footerHt + 'px';
        console.log("phone", headerHt,windowHt,footerHt);
        document.getElementsByTagName("body")[0].style.overflowY = "hidden"
      }
  }

  componentWillMount() {
      //this.setState({countrySelected:this.state.countrySelected});

   
      if (Meteor.isCordova) {

      var push_username = '@Test';
      var push_message = 'Test message';
      Meteor.call("sendPushNotification", push_username, push_message, (error, result) => {
        if(error) {
          console.log("serror :",error);
        } else {
          console.log("result : ",result);
        }
      });

       
      //console.log("component will mount");
    }

  }

  render() {

      var isDevice = true;
      var searchActive = false;

      var queryUrl = this.props.router.location.query;
      var logoName = "Releasery"
      //code for document title
      var urlLocation = this.props.router.location; 
      //console.log(this.props.router)
      if(urlLocation && urlLocation.hasOwnProperty("query") && ("cat" in urlLocation.query) && urlLocation.hasOwnProperty("state") && urlLocation.state && urlLocation.state.length > 0) {
        logoName = urlLocation.state;
      }
        else {
        switch(urlLocation.pathname) {
          case "/":
            logoName = "All Releases";
          break;

          case "/SearchPage":
            logoName = "Search";
          break;

          case "/categoriesMenu":
            logoName = "Collection";
          break;

          case "/account":
            logoName = "Profile"
          break;

          case "PostDetails":
            logoName = "Releasery"
          break;

          case "/daily":
            logoName = "All Releases"
          break;

        }
      }

      //code for document title

      if (Meteor && Meteor.Device && Meteor.Device.isDesktop()) {
         isDevice = false;
         
       }

      if(queryUrl && ((queryUrl.showSearch && queryUrl.showSearch == "true") || (queryUrl.query && queryUrl.query.length > 0)) ) {
          searchActive = true;
       }
 
      if(!isDevice) {

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

    } else {
      
      return (
       <div className={"wrapper mobile-wrapper " + logoName + " " + urlLocation.pathname.replace(/\//g, "") + " " + this.props.router.routes[1].name } id="wrapper">

          <Telescope.components.HeadTags />

          <Telescope.components.UsersProfileCheck {...this.props} />

          <Telescope.components.Header {...this.props}  title={logoName}/>
          <div className="main">
             <FlashContainer component={Telescope.components.FlashMessages}/>

            <div className={searchActive ? "childrenWrapper searchActive mobile" : "childrenWrapper mobile" }>
                {this.props.children}
            </div>


          </div>

          <Telescope.components.Footer {...this.props}/>

        </div>
      )
    }

  }
}



export default withRouter(CustomLayout);
/* <!-- {this.props.children} -->
<div className="customLayoutCategoriesBlock">
				<Telescope.components.Categories  />

			</div>
               {React.cloneElement(this.props.children, { userCountry: this.state.countrySelected })}

 <CustomCountryList selectCountry={this.handleCountry.bind(this)}/>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>

{searchActive ? <Telescope.components.MobileSearchComponent /> : null } 
            
      */
