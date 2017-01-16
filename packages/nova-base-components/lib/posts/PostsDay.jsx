import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { ListContainer } from "meteor/utilities:react-list-container";
import moment from 'moment';
import Posts from "meteor/nova:posts";

class PostsDay extends Component {

  render() {
  //  console.log("posts day called",this.props);
    const {date, number} = this.props;

    const terms = {
      view: "daily",
      cat: this.props.locQuery.cat,
      country: this.props.locQuery.country,
      date: date,
      after: moment(date).format("YYYY-MM-DD"),
      before: moment(date).format("YYYY-MM-DD"),
      enableCache: number <= 15 ? true : false, // only cache first 15 days
      listId: `posts.list.${moment(date).format("YYYY-MM-DD")}`
    };

    ({selector, options} = Posts.parameters.get(terms));
   // console.log('options',options);
  //  console.log('selector',selector);
    const postsPerPage = Telescope.settings.get("postsPerPage", 10);

    return (
      <div className="posts-day">
        <h4 className="posts-day-heading">{moment(date).format("dddd, MMMM Do YYYY")}</h4>
        <ListContainer 
          collection={Posts} 
          publication="posts.list"
          selector={selector}
          options={options}
          terms={terms} 
          joins={Posts.getJoins()}
          component={Telescope.components.PostsList}
          componentProps={{showHeader: false,userCountry:this.props.userCountry}}
          listId={terms.listId}
          limit={postsPerPage}
        />
      </div>
    )

  }

}

PostsDay.propTypes = {
  date: React.PropTypes.object,
  number: React.PropTypes.number
}

module.exports = PostsDay;
export default PostsDay;