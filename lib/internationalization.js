'use strict'

const i18n = require('i18n');
i18n.configure({
    locales: ['en','es'],
    directory: __dirname + 'locales',
    register: global
});

const translate = function(key, locale) {
    return i18n.__(key);
}

module.exports.translate = translate;
