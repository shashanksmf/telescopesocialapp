import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component, intlShape } from 'react';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import { ModalTrigger } from "meteor/nova:core";
import { Link } from 'react-router';
import Posts from "meteor/nova:posts";
import Categories from "meteor/nova:categories";
import HunterMaker from './partials/HunterMaker.jsx';
import CustomPostDetails from './partials/CustomPostDetails.jsx';
import { IndexLink } from 'react-router';
import { withRouter } from 'react-router';
import CustomSlider from "./partials/CustomSlider";

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


  renderPrices(post){
    const currentQuery = _.clone(this.props.router.location.query);
    var selectedCoutry;

    var countryArr = [];
    
    if(currentQuery && currentQuery.country){
      selectedCoutry = currentQuery.country;
    }
    else if(Meteor.isClient && localStorage.getItem("userCountry")){ 
      selectedCoutry = localStorage.getItem("userCountry"); 
    }

    if(selectedCoutry){
      if(post.hasOwnProperty("productReleaseDate")) {
        countryArr = post.productReleaseDate.filter(function(item){
          //console.log("item",item,selectedCoutry);
          if(item && item.country){
            return item.country.toLowerCase() == selectedCoutry.toLowerCase();
          }
          
        })
      }
    }
    //console.log("custompost details post props",this.props.post);
    
    if(countryArr.length>0) {

      countryArr.sort(function(a, b) {
        return parseInt(a.price) - parseInt(b.price);
      });

      return ( 


        <div className="ui buttons priceDropDown" onClick={()=>{ this.setState({ priceBtnExpand : !this.state.priceBtnExpand }) }}>
          <div className="ui button" >Price : <i className={countryArr[0].currencyIcon}></i> {countryArr[0].price} </div>
          <div className="ui floating dropdown icon button">
            <i className="dropdown icon"></i>
            <div className={this.state.priceBtnExpand ? "menu prices transition visible" : "menu prices"}>
              {countryArr.map(function(country){
                  return  <div className="item"><a target="_blank" href={country.sourceUrl}>{country.vendorName}  {country.vendorName ? ": ": ""}<i className={country.currencyIcon}></i>{country.price}</a></div>
            })}
            </div>
          </div>
        </div>
        
        )
    }
  }
  
  renderPost() {
    const post = this.props.post;
 //   console.log(post);
    const htmlBody = {__html: post.htmlBody};
   // console.log(htmlBody);
    return (
      <div className="post-actions">
          <ModalTrigger title="View Post" component={
            <a className="posts-action-edit">
                  {post.title}
            </a>}>

            <div>

            <CustomSlider post={post}/>

            <div className="customPostPageContainer">
              <Telescope.components.PostsItem post={post}/>
              {post.product ? <HunterMaker  post={post}/> : null} 
               <CustomPostDetails post={post} />
              {post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null}
            </div>
           
            <Telescope.components.PostsCommentsThread document={post} />
            </div>
          </ModalTrigger>
      </div>
    )
  }

  render() {
    var itemPriceCountry = {};
    var countryName='';
    if (typeof window === 'object') {
       countryName = (this.props.userCountry != undefined && this.props.userCountry.length >0) ? this.props.userCountry : (window == undefined ? '':window.localStorage.getItem("userCountry"));    
    } 

    else {
           countryName = (this.props.userCountry != undefined && this.props.userCountry.length >0) ? this.props.userCountry : '';    
     }
    
    const post = this.props.post;
  	//console.log("post :ss",this.props,"countryName : ",countryName);
    if(this.props.post.hasOwnProperty("productReleaseDate")){
      if(this.props.post.productReleaseDate.constructor === Array){
        this.props.post.productReleaseDate.forEach(function(items){
          if(items){
            if(items.hasOwnProperty("country") && countryName != null && countryName.length > 1 ){
            // console.log("items",items,"countryName",countryName)
              if(items.country.trim().toLowerCase() == countryName.trim().toLowerCase()){
                itemPriceCountry.countryName = countryName; 
              
                if(items.hasOwnProperty("price")){
                  itemPriceCountry.price =  items.price;  
                }

                if(items.hasOwnProperty("currencyIcon")){
                  itemPriceCountry.currencyIcon =  items.currencyIcon;  
                }

                if(items.hasOwnProperty("reldate")){
                  itemPriceCountry.relDate = items.reldate == undefined ? '' : (items.reldate); 
                }

               
              }
              
            }

          }

        })
      }
    }

  //  console.log("itemPriceCountry : ",itemPriceCountry);
    let postClass = "posts-item"; 
    if (post.sticky) postClass += " posts-sticky";

    // ⭐ custom code starts here ⭐
    if (post.color) {
      postClass += " post-"+post.color;
    }
	
    // ⭐ custom code ends here ⭐

    return (
      <div className={postClass}>
        {(post.thumbnailUrl || post.image) ? <Telescope.components.PostsThumbnail post={post}/> : null}

        <div className="posts-item-content">
          Mobile post items
          <h3 className="posts-item-title ">
           {this.renderPost()}  
          

           
          </h3>
		  
          
          <div className="posts-item-meta">
            {post.user? <div className="posts-item-user"><Telescope.components.UsersAvatar user={post.user} size="small"/><Telescope.components.UsersName user={post.user}/></div> : null}
            <div className="posts-item-date"><FormattedRelative value={post.postedAt}/></div>
            <div className="posts-item-comments">
              <Link to={Posts.getPageUrl(post)}>
                <FormattedMessage id="comments.count" values={{count: post.commentCount}}/>
              </Link>
            </div>
			
			
			
            {this.context.currentUser && this.context.currentUser.isAdmin ? <Telescope.components.PostsStats post={post} /> : null}
            
          </div>
          <div className="commnetorsCategoriesContainer">
           <div className="priceWrapper">
                
              {this.renderPrices(this.props.post)}

           </div>
            {this.renderCommenters()}
    				{this.renderCategories()}
         </div>
		</div>

       
        
       <div className="customDatePriceCountry">
              {(itemPriceCountry.countryName != undefined && itemPriceCountry.countryName != null) ? 
                  <div className="dateContainer">
                  
                     <span className="month">
                          {moment(itemPriceCountry.relDate).format('MMM')} 
                    </span>
                    <span className="day">
                          {moment(itemPriceCountry.relDate).format('DD')} 
                    </span>
                    <span className="year">
                          {moment(itemPriceCountry.relDate).format('gggg')} 
                    </span>
                   </div>  
                :''}

              <div className="posts-item-vote customVote">
                  

                <Telescope.components.Vote  post={post} />
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
