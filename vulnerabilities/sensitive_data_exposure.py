def get_credit_card_info():
    # Vulnerable: Returns sensitive data in plaintext
    return 'Credit Card: 4111-1111-1111-1111, Exp: 12/30, CVV: 123'
