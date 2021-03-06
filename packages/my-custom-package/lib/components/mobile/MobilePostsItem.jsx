import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component, intlShape } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import { ModalTrigger } from "meteor/nova:core";
import { Link } from 'react-router';
import Posts from "meteor/nova:posts";
import Categories from "meteor/nova:categories";
import HunterMaker from './../partials/HunterMaker.jsx';
import CustomPostDetails from './../partials/CustomPostDetails.jsx';
import { IndexLink } from 'react-router';
import { withRouter } from 'react-router';
import CustomSlider from "./../partials/CustomSlider";

//console.log("Telescope",Telescope);
class MobilePostsItem extends Component {
  constructor(props){
    super(props);
    this.state = { priceBtnExpand : false ,externaShareExpand :false };

  }


  componentWillReceiveProps(props){
  }
  
  renderCategories() {
    return this.props.post.categoriesArray ? <Telescope.components.PostsCategories post={this.props.post} /> : "";
  }

  renderCommenters() {
    return this.props.post.commentersArray ? <Telescope.components.PostsCommenters post={this.props.post}/> : "";
  }


  render() {
    var itemPriceCountry = {};
    var countryName='';
    var proRelDateMatchArr = [];
    var user = Meteor.user();

    if(user && user.hasOwnProperty("telescope") && user.telescope.hasOwnProperty("location") && user.telescope.location.constructor === Array &&  user.telescope.location.length > 0 && user.telescope.location[0].country && user.telescope.location[0].country.length > 0) {
      var countryArr = user.telescope.location[0].country.split(",")
      countryName = countryArr[countryArr.length-1].trim();
    }
    else {
      countryName = Meteor.settings.public.defaultCountry;
    }

    
    const post = this.props.post;
  	//console.log("post :ss",this.props,"countryName : ",countryName);
      if(post.hasOwnProperty("productReleaseDate") &&post.productReleaseDate.constructor === Array && post.productReleaseDate.length > 0 ) {
      
      post.productReleaseDate.forEach(function(item,index){
        if(item.country) {
          var countryLen = item.country.split(",").length;
          if(countryName.toLocaleLowerCase() == item.country.split(",")[countryLen-1].trim().toLocaleLowerCase()) {
            proRelDateMatchArr.push(item)
          }
        }
      })

    }

  //  console.log("itemPriceCountry : ",itemPriceCountry);
    let postClass = "posts-item"; 
    if (post.sticky) postClass += " posts-sticky";

    // ⭐ custom code starts here ⭐
    if (post.color) {
      postClass += " post-"+post.color;
    }
  	 const htmlBody = {__html: post.htmlBody};

    // ⭐ custom code ends here ⭐
    //console.log("itemPriceCountry",post.title,itemPriceCountry)
    return (
      <div className={postClass}>
        {(post.thumbnailUrl || post.image) ? <Telescope.components.PostsThumbnail post={post}/> : null}

        <div className="posts-item-content">
          <Link to={{pathname: 'PostDetails/'+post._id, state: { post:post}} } ><h3 className="posts-item-title "> {post.title}</h3></Link>
	
          <div className="posts-item-meta">
           {post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null}
            
          </div>
          <div className="commnetorsCategoriesContainer">
          { proRelDateMatchArr.length == 1  ?
             <Telescope.components.MobileDateLikeBtn  post={post} date={moment(itemPriceCountry.relDate).format('MM')+'-'+moment(itemPriceCountry.relDate).format('DD')+'-'+moment(itemPriceCountry.relDate).format('gg')} />
             :  (proRelDateMatchArr.length > 1 ? 
              <Telescope.components.MobileVariousDatesBtn post={post}  dateCountryMatch={proRelDateMatchArr} />
              : null )  }

    				{this.renderCategories()}
         </div>
		</div>

    </div>
    )
  }
};
  
MobilePostsItem.propTypes = {
  
  post: React.PropTypes.object.isRequired
}

MobilePostsItem.contextTypes = {
  currentUser: React.PropTypes.object
};

export default withRouter(MobilePostsItem);
