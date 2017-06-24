import { Meteor } from 'meteor/meteor';
Meteor.methods({

	serverNotification: function(text,title) {
		var badge = 1;
		Push.send({
		from: 'push',
		title: title,
		text: text,
		badge: badge,
		payload: {
		title: title,
		text:text
		},
		query: {
		// this will send to all users
		}
	});
},
userNotification: function(text,title,userId) {
	var badge = 1;
		Push.send({
		from: 'push',
		title: title,
		text: text,
		badge: badge,
		payload: {
		title: title
	},
	query: {
		userId: userId //this will send to a specific Meteor.user()._id
	}
	});
},

removeHistory: function() {
	NotificationHistory.remove({}, function(error) {
		if (!error) {
		console.log("All history removed");
		}
		});
		}
	})