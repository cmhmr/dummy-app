import hashlib

def hash_password(password):
    # Vulnerable: Uses weak MD5 hash
    return hashlib.md5(password.encode()).hexdigest()
