import Config from "../lib/config";

Config.Url     = "https://local.halftau.com"
Config.Context = "Pruebas";

const client_id = 540289891877889;
const url       = document.location.origin;

Config.Redirect = `https://local.halftau.com/Login/Site/form?response_type=code&client_id=${client_id}&redirect_uri=${url}/redirect.html&scope=Login&login_hint=&state=`;

export default Config;
