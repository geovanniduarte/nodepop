'use strict'

const inter = require('../lib/internationalization');

const customError = function CustomError(message, extra) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name
    this.message = inter.__(message);
    console.log('MESSAGE', inter.__(message));
    this.extra = extra;
}
module.exports = customError;
require('util').inherits(module.exports, Error);