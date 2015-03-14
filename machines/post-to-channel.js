module.exports = {
  friendlyName: 'Post to channel',
  description: 'Post a message to the specified channel in Slack.',
  extendedDescription: 'Unless otherwise configured, this machine posts to the "#general" channel.',
  inputs: {
    webhookUrl: {
      description: 'A Slack webhook URL',
      example: 'https://hooks.slack.com/services/xxxxyyyy/ZZZZZZZZ/XXXXXXXXXXXXXXX',
      required: true,
      whereToGet: {
        url: 'https://slack.com/services/new/incoming-webhook',
        description: 'Setup a new webhook, then copy the "Webhook URL".',
        extendedDescription: 'You will need to be logged in to Slack, or sign up for an account if you haven\'t already.'
      },
      friendlyName: "Webook URL"
    },
    username: {
      description: 'The username to use when posting',
      example: 'someboty',
      friendlyName: "Username"
    },
    channel: {
      description: 'The Slack channel where the post should be sent',
      example: '#general',
      friendlyName: "Channel"
    },
    message: {
      description: 'The message to post',
      example: 'Good morning, boys and girls!',
      friendlyName: "Message"
    },
    iconEmoji: {
      example: ':ghost:',
      friendlyName: 'Icon Emoji',
      description: "The bot icon to display next to the post.",
      whereToGet: "http://www.emoji-cheat-sheet.com/"
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

    var slack = new Slack();
    slack.setWebhook(inputs.webhookUrl);

    slack.webhook({
      channel: inputs.channel || "#general",
      username: inputs.username || 'machinepack-slack',
      icon_emoji: inputs.iconEmoji,
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
