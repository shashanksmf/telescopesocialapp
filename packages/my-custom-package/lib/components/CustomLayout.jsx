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
//   componentDidMount() {
//      this.setState({countrySelected:this.state.countrySelected});
// }

  render() {

    return (
      <div className="wrapper" id="wrapper">

        <Telescope.components.HeadTags />

        <Telescope.components.UsersProfileCheck {...this.props} />

        <Telescope.components.Header {...this.props}/>
      
        <div className="main">

          <FlashContainer component={Telescope.components.FlashMessages}/>
			
          <Telescope.components.Newsletter {...this.props}/>
      		<div className="CustomCategoriesContainer">
        			<div className="customCategoriesWrapper">
        					<CustomPostsCategories/>
        			</div>
          </div>
         {this.props.children}

	
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
    
      */