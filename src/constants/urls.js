const { app } = require('electron');

const BASE_URL = process.env.DEVELOPMENT === 'true'
  ? 'https://localhost:8000'
  : 'https://insights-agent-api.specollective.org';

// TODO: Handle ingestion gracefully in development.  
const BASE_INGESTION_URL = process.env.DEVELOPMENT === 'true'
  ? 'http://localhost:6000'
  : process.env.INGESTION_URL;

const DEFAULT_OPTIONS = {
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
}

module.exports = {
  DEFAULT_OPTIONS,
  BASE_URL,
  BASE_INGESTION_URL
}
