module.exports = {
  friendlyName: 'Post to channel',
  description: 'Post a message to the specified channel in Slack.',
  extendedDescription: '',
  inputs: {},
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Done.'
    }
  },
  fn: function(inputs, exits) {
    var Slack = require('slack-node');

    domain = "--your-slack-subdomain--";
    webhookToken = "--your-slack-webhook--";

    slack = new Slack(webhookToken, domain);

    slack.webhook({
      channel: "#general",
      username: "webhookbot",
      text: "This is posted to #general and comes from a bot named webhookbot."
    }, function(err, response) {
      console.log(response);
    });
    return exits.success();
  },

};
