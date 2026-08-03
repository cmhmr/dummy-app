function getCreditCardInfo() {
    // Vulnerable: Returns sensitive data in plaintext
    return 'Credit Card: 4111-1111-1111-1111, Exp: 12/30, CVV: 123';
}

module.exports = { getCreditCardInfo };
