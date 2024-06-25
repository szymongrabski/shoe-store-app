const Keycloak = require('keycloak-connect');
require('dotenv').config();

const keycloakConfig = {
  realm: process.env.KEYCLOAK_REALM,
  "auth-server-url": process.env.KEYCLOAK_URL,
  "ssl-required": "external",
  resource: process.env.KEYCLOAK_CLIENT,
  "enable-cors": true,
  "cors-allowed-methods": "POST, PUT, DELETE, GET",
  credentials: {
    secret: process.env.KEYCLOAK_CLIENT_SECRET
  }
};

const keycloak = new Keycloak({}, keycloakConfig);

module.exports = keycloak;
