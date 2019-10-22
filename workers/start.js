const {getLang} = require('../core/funcs');

module.exports = (ctx) => {

	let {from} = ctx.update.message;

	let lang = from.language_code;

	/* === === === === === */
	/* Send welcome message
	/* === === === === === */

	return ctx.reply((lang === 'en' ?
	`
		Hey, ${from.first_name}! 🙃

		You can send me any text message and I'll send you a voice message by your text.

		Creator: @aleoheen

		Try it! 😉
	`:`
		Привет, ${from.first_name}! 🙃

		Ты можешь отправить мне любое сообщение, а я произнесу его!

		Автор бота: @aleoheen

		Попробуй прямо сейчас! 😉
	`)
	.replace(/[\t]*/g, ''), {parse_mode: 'markdown'});
}