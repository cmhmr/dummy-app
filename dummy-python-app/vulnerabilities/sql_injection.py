import sqlite3

def get_user_by_id(user_id):
    # Vulnerable to SQL Injection
    conn = sqlite3.connect(':memory:')
    conn.execute('CREATE TABLE users (id TEXT, name TEXT)')
    conn.execute("INSERT INTO users VALUES ('1', 'admin')")
    query = f"SELECT name FROM users WHERE id = '{user_id}'"
    try:
        result = conn.execute(query).fetchone()
        return result[0] if result else 'Not found'
    except Exception as e:
        return str(e)
