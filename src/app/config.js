import { Config } from "../lib";

Config.Url     = "https://local.halftau.com"
Config.Context = "Pruebas";

const client_id = 540289891877889;
const url       = document.location.href;

Config.Redirect = `https://local.halftau.com/Login/Site/auth?response_type=code&client_id=${client_id}&redirect_uri=${url}redirect.html&scope=Login&login_hint=&state=`;

export default Config;
