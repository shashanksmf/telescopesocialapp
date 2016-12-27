Meteor.startup(function () {
  process.env.MAIL_URL = process.env.MAIL_URL = "smtp://postmaster%40<your-mailgun-address>.mailgun.org:password@smtp.mailgun.org:587";
});