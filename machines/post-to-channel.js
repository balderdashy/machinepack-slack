module.exports = {
  friendlyName: 'Post to channel',
  description: 'Post a message to the specified channel in Slack.',
  extendedDescription: 'Unless otherwise configured, this machine posts to the "#general" channel.',
  inputs: {
    subdomain: {
      description: 'A "Slack domain"',
      example: 'my-company-name',
      required: true,
      whereToGet: {
        url: 'https://slack.com/signin',
        description: 'Copy a "Slack domain" (i.e. the subdomain prefix you use when logging in to Slack)'
      }
    },
    webhookToken: {
      description: 'A Slack webhook token',
      example: 'T23GPA913932B032/131BAZF1013GJ291',
      required: true,
      whereToGet: {
        url: 'https://slack.com/services/new/incoming-webhook',
        description: 'Setup a new webhook, then copy everything after the final slash ("/") in the "Webhook URL".',
        extendedDescription: 'You will need to be logged in to Slack, or sign up for an account if you haven\'t already.'
      }
    },
    username: {
      description: 'The username to use when posting',
      example: 'someboty'
    },
    channel: {
      description: 'The Slack channel where the post should be sent',
      example: '#general'
    },
    message: {
      description: 'The message to post',
      example: 'Good morning, boys and girls!'
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    notFound: {
      description: 'Specified subdomain and webhook token combination does not match any known Slack accounts'
    },
    success: {
      description: 'Done.'
    }
  },
  fn: function(inputs, exits) {
    var Slack = require('slack-node');

    var slack = new Slack(inputs.webhookToken, inputs.subdomain);

    slack.webhook({
      channel: inputs.channel || "#general",
      username: inputs.username || 'machine',
      text: inputs.message||'Hello world!  Posted from the `post-to-channel` machine in `machinepack-slack`.'
    }, function(err, response) {
      if (err) return exits.error(err);
      if (response.statusCode === 404) {
        return exits.notFound();
      }
      if (response.statusCode < 200 || response.statusCode >= 400){
        return exits.error(err);
      }
      return exits.success();
    });
  },

};
