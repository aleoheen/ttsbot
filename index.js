require('dotenv').config();
const Telegraf = require('telegraf');

/* === === === === === */
/* Run the bot
/* === === === === === */

const bot = new Telegraf(process.env.BOT_TOKEN);

/* === === === === === */
/* When /start
/* === === === === === */

bot.start(require('./workers/start'));


/* === === === === === */
/* When text
/* === === === === === */

bot.on('text', require('./workers/text'));

/* === === === === === */
/* Lauch the bot
/* === === === === === */

bot.launch().then(() => {
	console.log('Bot launched!');
});