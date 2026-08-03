function getDebugInfo() {
    // Vulnerable: Exposes debug info
    return 'DEBUG: Exception stack trace, DB connection string, etc.';
}

module.exports = { getDebugInfo };
