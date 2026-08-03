def login(username, password):
    # Vulnerable: No logging of failed logins
    if username == 'admin' and password == '1234':
        return 'Login successful'
    return 'Login failed'
