function renderComment(comment) {
    // Vulnerable: No output encoding
    return `<div>${comment}</div>`;
}

module.exports = { renderComment };
