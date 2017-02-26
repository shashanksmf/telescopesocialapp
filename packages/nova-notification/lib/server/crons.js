import cron from "meteor/percolatestudio:synced-cron";
import Posts from "meteor/nova:posts";
import Notification from "../collection.js";

cron.SyncedCron.add({
  name: 'Notification Cron',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text("at 12:01am");
  },
  job: function() {

    var date = new Date();
    date.setDate(date.getDate()-2);
  	var posts = Posts.find({ 'customArray11.reldate' : { $lte : date } }).fetch();
  	posts.forEach(function(post, index, posts){
     // console.log('Post Find', post.title);
      if(post.upvoters){
       // console.log('Upvoters find');
        post.upvoters.forEach(function(upvoter, index, upvoters){
         console.log(upvoter);
          post.customArray11.forEach(function(data, index, array){
            var dataDate = new Date(data.reldate);
            if(date <= dataDate){
                var insertData = {
                  to: upvoter,
                  postId: post._id,
                  read: false,
                  message: post.title + ' Will Relase ' + dataDate.toDateString()+ ' in ' + data.country,
                  date: new Date()
                }
                console.log("insertData",insertData);
                Notification.insert(insertData);
            }
          });    
        });
      }
  		
  	});
  	// console.log(posts);
    console.log('Job Is Running');
  }
});

cron.SyncedCron.start();