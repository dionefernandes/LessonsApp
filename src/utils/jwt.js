const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const RSAKeyGenerator = require('./rsaKeyGenerator');
const LessonModel = require('../models/lessonModel');

class JWT {
  constructor() {
    RSAKeyGenerator.generateKeyPair();
    this.lessonModel = new LessonModel();

    const privateKeyPath = path.join(__dirname, '..', 'config', 'private.key');
    const publicKeyPath = path.join(__dirname, '..', 'config', 'public.key');

    const readPrivateKey = new Promise((resolve, reject) => {
      fs.readFile(privateKeyPath, 'utf-8', (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  
    const readPublicKey = new Promise((resolve, reject) => {
      fs.readFile(publicKeyPath, 'utf-8', (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  
    // Waiting for Promises to resolve before assigning keys
    Promise.all([readPrivateKey, readPublicKey]).then(([privateKey, publicKey]) => {
      this.privateKey = privateKey;
      this.publicKey = publicKey;
    });
  };

  sign(payload, options) {
    const expiresIn = 3600;
    const privateKey = this.privateKey;
    const publicKey = this.publicKey;

    options = { ...options, expiresIn: expiresIn };
    const token = jwt.sign(payload, privateKey, options);
    
    return { token, privateKey, publicKey, expiresIn };
  };

  async verify(token, options) {
    const tokenItem = await this.lessonModel.findToken(token);

    if( !tokenItem || !tokenItem.publicKey || tokenItem.publicKey.trim() === '' ) {
      return res.status(401).send( {message: 'This token is not registered'} );
    }

    const publicKey = tokenItem.publicKey;

    return jwt.verify(token, publicKey, options);
  };
};

module.exports = JWT;