const crypto = require("crypto");

const algorithm = 'aes-256-cbc';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);



module.exports = {
     encrypt  (text)  {
         let cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
         let encrypted = cipher.update(text);
         encrypted = Buffer.concat([encrypted, cipher.final()]);
         return iv.toString('hex') + '&' + encrypted.toString('hex');
    },

     decrypt  (text)  {
         let textParts = text.split('&');
         let iv = Buffer.from(textParts.shift(), 'hex');
         let encryptedText = Buffer.from(textParts.join('&'), 'hex');
         let decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
         let decrypted = decipher.update(encryptedText);
         decrypted = Buffer.concat([decrypted, decipher.final()]);

         return decrypted.toString();
    }
}