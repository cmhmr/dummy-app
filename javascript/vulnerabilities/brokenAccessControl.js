function getAdminResource(role) {
    // Vulnerable: No proper access check
    if (role === 'admin') return 'Sensitive admin data';
    return 'Access denied, but data still leaked: Sensitive admin data';
}

module.exports = { getAdminResource };
