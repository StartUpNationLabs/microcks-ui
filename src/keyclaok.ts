import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://localhost:8180",
    realm: "microcks",
    clientId: "microcks-app-js",
});
export default keycloak;