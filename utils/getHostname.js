// utils/getHostname.js
const url = require('url');

function getHostname(inputUrl) {
    const { hostname } = new URL(inputUrl);
    return hostname.replace('www.', '');
}

module.exports = getHostname;
