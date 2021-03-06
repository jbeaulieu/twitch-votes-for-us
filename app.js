require('dotenv').config();
const tmi = require('tmi.js');

var election_day = new Date('11/03/2020 12:00 AM');

const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true,
		port: process.env.PORT
	},
	identity: {
		username: process.env.TWITCH_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN
	},
	channels: ['VotesForUs']
});

client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!wevote' || message.toLowerCase() === '!votesforus') {

        var now = new Date();
        var countdown = election_day - now;

        var days = String(Math.floor(countdown / (1000 * 60 * 60 * 24)));

        var message = "US elections are in " + days + " days! Check your registration at https://vote.gov. Learn more " +
            "about early voting and vote-by-mail and at https://vote.org"

		client.say(channel, message);
	}
});