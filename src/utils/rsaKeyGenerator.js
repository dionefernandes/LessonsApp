const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const privateKeyPath = path.join(__dirname, '..', 'config', 'private.key');
const publicKeyPath = path.join(__dirname, '..', 'config', 'public.key');

class RSAKeyGenerator {
  static generateKeyPair() {
    if( !fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath) ) {
      const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        }
      });

      fs.writeFileSync(privateKeyPath, privateKey);
      fs.writeFileSync(publicKeyPath, publicKey);
    }
  }
}

module.exports = RSAKeyGenerator;