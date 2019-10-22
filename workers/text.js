const {getLang, rand} = require('../core/funcs');

const TTS = require('google-tts-api');
const LanguageDetect = require('languagedetect');
const lng = new LanguageDetect();

module.exports = (ctx) => {

	let {text, from} = ctx.update.message;

	/* === === === === === */
	/* Check language
	/* === === === === === */

	let lang = getLang(from.language_code);

	/* === === === === === */
	/* Check if emoji
	/* === === === === === */

	if((/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/gi).test(text)) {
		return;
	}

	/* === === === === === */
	/* Check the message length is less than 200 symbols
	/* === === === === === */

	if(text.length > 200) {
		return ctx.reply((lang === 'en' ?
		`
			Sorry. 😔

			This bot can work with short messages.
		`:`
			Простите, но наш бот может обработать только короткие сообщения.
		`)
		.replace(/[\t]*/g, ''));
	}

	/* === === === === === */
	/* Check message language
	/* === === === === === */

	let mLang = lng.detect(text, 1);

	if(!mLang.length) mLang = 'en';

	else mLang = mLang[0][0] === 'russian' ? 'ru' : 'en';

	/* === === === === === */
	/* Speak
	/* === === === === === */

	TTS(text, mLang, 1).then((url) => {
		
		/* === === === === === */
		/* Download audio
		/* === === === === === */

		fetch(url).then(res => res.buffer()).then((buffer) => {

			/* === === === === === */
			/* When done
			/* === === === === === */

			ctx.replyWithVoice({source: buffer})

		});

	})
	.catch((error) => {
		console.error(error);
		ctx.reply('Sorry. There is an error');
	});

}