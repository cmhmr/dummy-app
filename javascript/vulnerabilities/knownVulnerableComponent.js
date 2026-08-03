const crypto = require('crypto');

function hashPassword(password) {
    // Vulnerable: Uses weak MD5 hash
    return crypto.createHash('md5').update(password).digest('hex');
}

module.exports = { hashPassword };
