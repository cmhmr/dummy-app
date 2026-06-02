def authenticate(username, password):
    # Vulnerable: Hardcoded credentials and no lockout
    if username == 'admin' and password == '1234':
        return 'Authenticated as admin'
    return 'Authentication failed'
