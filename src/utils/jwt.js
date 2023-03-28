const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const RSAKeyGenerator = require('./rsaKeyGenerator');

class JWT {
  constructor() {
    RSAKeyGenerator.generateKeyPair();
    const privateKeyPath = path.join(__dirname, '..', 'config', 'private.key');
    const publicKeyPath = path.join(__dirname, '..', 'config', 'public.key');
    this.privateKey = fs.readFileSync(privateKeyPath).toString();
    this.publicKey = fs.readFileSync(publicKeyPath).toString();
  };

  sign(payload, options) {
    options = { ...options, expiresIn: 86400 };
    return jwt.sign(payload, this.privateKey, options);
  };

  verify(token, options) {
    return jwt.verify(token, this.publicKey, options);
  };
};

module.exports = JWT;