const util = require('util');

/* === === === === === */
/* Define functions
/* === === === === === */

module.exports = {

	util,

	rand(min, max) {
		return Math.round(Math.random() * (max-min) + min);
	},

	getLang(lang = 'en') {
		return ['ru', 'en'].includes(lang) ? lang : 'en';
	}

}