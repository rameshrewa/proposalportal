import config from "../assets/config";

import { interceptor } from "./interceptor";
const axios = require("axios");

const srcmAx = axios.create({
  baseURL: config.srcmApi,
});

const ax = axios.create({
  baseURL: config.apiURL,
});
const srcmApiv2 = axios.create({
  baseURL: config.srcmApiv2,
});
const evalutionURL = axios.create({
  baseURL: config.evalutionURL,
});
const abhyasiSearch = axios.create({
  baseURL: config.evalutionURL,
});

export { srcmAx, ax, srcmApiv2, evalutionURL };

interceptor(ax, srcmApiv2, abhyasiSearch);
