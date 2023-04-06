const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const RSAKeyGenerator = require('./rsaKeyGenerator');

class JWT {
  constructor() {
    RSAKeyGenerator.generateKeyPair();
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
  
    // Aguardando a resolução das Promises antes de atribuir as chaves
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

  verify(token, options) {
    return jwt.verify(token, this.publicKey, options);
  };
};

module.exports = JWT;