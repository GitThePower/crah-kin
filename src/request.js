const axios = require('axios');

axios.defaults.baseURL = 'https://api.kraken.com/';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['User-Agent'] = 'Crah Kin API Client';

module.exports = axios;