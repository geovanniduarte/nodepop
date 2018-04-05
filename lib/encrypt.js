'use strict'

const crypto = require('crypto');
const HASH_KEY = 'keepcoding';

const encrypt = function(string) {
    return crypto.createHash('sha256').update(HASH_KEY).digest('hex');
}

module.exports.encrypt = encrypt;