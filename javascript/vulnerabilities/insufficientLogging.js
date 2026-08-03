function login(username, password) {
    // Vulnerable: No logging of failed logins
    if (username === 'admin' && password === '1234') return 'Login successful';
    return 'Login failed';
}

module.exports = { login };
