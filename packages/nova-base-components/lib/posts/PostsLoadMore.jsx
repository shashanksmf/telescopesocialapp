import React from 'react';
import { FormattedMessage } from 'react-intl';

const PostsLoadMore = ({loadMore, count, totalCount}) => {

	var that = this;
	if(Meteor.isClient) {
      $(".main").scroll(function() {
        console.log("main");
      if($(".posts-load-more") && $(".posts-load-more").length > 0 && ($(window).height() > $(".posts-load-more").offset().top)) {
      	console.log($(window).height(),$(".posts-load-more").offset().top)
   //   	console.log(that.re\fs);
       		//that.refs.loadMoreRef.click();
       		document.getElementsByClassName("posts-load-more")[0].click()
      }
    });
      
    }

  return (
    <a className="posts-load-more" onClick={loadMore}>
      <span><FormattedMessage id="posts.load_more"/></span>
      &nbsp;
      {totalCount ? <span className="load-more-count">{`(${count}/${totalCount})`}</span> : null}
    </a>
  )
}

PostsLoadMore.displayName = "PostsLoadMore";

module.exports = PostsLoadMore;