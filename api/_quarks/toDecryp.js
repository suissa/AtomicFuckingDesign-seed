'use strict';

module.exports = (value) => {
  const crypto = require('crypto')
      , key = ('../_config/key')
      , decipher = crypto.createDecipher('aes_256_cbc', key)
      ;

      let decryptedPassword = decipher.update(value, 'base64', 'utf8');
      decryptedPassword += decipher.final('utf8');

      return decryptedPassword;
}
