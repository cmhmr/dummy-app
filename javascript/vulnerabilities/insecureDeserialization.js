function deserializeObject(base64) {
    // Vulnerable: Insecure deserialization (simulated)
    try {
        const json = Buffer.from(base64, 'base64').toString('utf8');
        return JSON.parse(json).key;
    } catch (e) {
        return e.message;
    }
}

module.exports = { deserializeObject };
