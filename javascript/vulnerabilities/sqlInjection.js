const sqlite3 = require('sqlite3').verbose();

function getUserById(userId) {
    // Vulnerable to SQL Injection
    const db = new sqlite3.Database(':memory:');
    db.serialize(() => {
        db.run("CREATE TABLE users (id TEXT, name TEXT)");
        db.run("INSERT INTO users VALUES ('1', 'admin')");
    });
    return new Promise((resolve) => {
        db.get(`SELECT name FROM users WHERE id = '${userId}'`, (err, row) => {
            resolve(row ? row.name : 'Not found');
            db.close();
        });
    });
}

module.exports = { getUserById };
