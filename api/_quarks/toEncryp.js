'use strict';

module.exports = (value) => {
  const crypto = require('crypto')
      , key = require('../_config/key')
      , cipher = crypto.createCipher('aes-256-cbc', key)
      ;

  let encryptedPassword = cipher.update(value, 'utf8', 'base64');
  encryptedPassword += cipher.final('base64');

  return encryptedPassword;
}
