const xml2js = require('xml2js');

function parseXml(xml) {
    // Vulnerable: XXE enabled (simulated)
    return xml.includes('&xxe;') ? 'Simulated XXE content' : 'No XXE';
}

module.exports = { parseXml };
