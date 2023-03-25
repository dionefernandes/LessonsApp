const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const RSAKeyGenerator = require('./rsaKeyGenerator');

const privateKeyPath = path.join(__dirname, '..', 'config', 'private.key');
const publicKeyPath = path.join(__dirname, '..', 'config', 'public.key');

class JWT {
  constructor() {
    RSAKeyGenerator.generateKeyPair();
    this.privateKeyPath = fs.readFileSync(privateKeyPath);
    this.publicKeyPath = fs.readFileSync(publicKeyPath);
  };

  sign(payload, options) {
    return jwt.sign(payload, this.privateKeyPath, options);
  };

  verify(token, options) {
    return jwt.verify(token, this.publicKeyPath, options);
  };
};

module.exports = JWT;