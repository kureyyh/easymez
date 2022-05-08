const session = require("express-session");
const Keycloak = require("keycloak-connect");

let _keycloak: any;

const keycloakConfig = {
  clientId: "easymez",
  bearerOnly: true,
  serverUrl: "https://www.kursatdogan.nl/",
  realm: "Master",
  credentials: {
    secret: "3hKMK7Y7mGTT1YeWRi7OJunEZMkQk127",
  },
};

function initKeycloak() {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!");
    return _keycloak;
  } else {
    console.log("Initializing Keycloak...");
    const memoryStore = new session.MemoryStore();
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    return _keycloak;
  }
}
function getKeycloak() {
  if (!_keycloak) {
    console.error(
      "Keycloak has not been initialized. Please called init first."
    );
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};
