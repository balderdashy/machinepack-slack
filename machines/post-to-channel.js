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
      friendlyName: "Channel",
      required: true
    },
    message: {
      description: 'The message to post',
      example: 'Good morning, boys and girls!',
      friendlyName: "Message",
      required: true
    },
    iconEmoji: {
      example: ':ghost:',
      friendlyName: 'Icon Emoji',
      description: "The bot icon to display next to the post.",
      whereToGet: "http://www.emoji-cheat-sheet.com/"
    },
    linkNames: {
      example: true,
      friendlyName: 'Link names?',
      description: 'Whether or not create links out of channel names and usernames'
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

    var Http = require('machinepack-http');
    Http.sendHttpRequest({
      url: inputs.webhookUrl,
      method: 'post',
      params: {
        channel: inputs.channel,
        text: inputs.message,
        link_names: inputs.linkNames ? 1 : 0,
        icon_emoji: inputs.iconEmoji,
        username: inputs.username
      }
    }).exec({
      success: exits.success,
      notFound: exits.notFound,
      error: exits.error
    });
  },

};
