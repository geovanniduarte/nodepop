'use strict'

const customError = function CustomError(message, extra) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name
    this.message = message;
    this.extra = extra;
}
module.exports = customError;
require('util').inherits(module.exports, Error);