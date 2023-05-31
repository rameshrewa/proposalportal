const configData = process.env;

const config = {};

try {
  // config.awGtagCode = configData.AWS_GTAG_CODE || 'AW-854824176/pzEJCL2dj_8CEPCpzpcD';
  config.srcmApi =
    configData.REACT_APP_API_SRCM_API_URI ||
    "https://static-gatsby-qa.web.app/srcmapi/";
  config.srcmApiv2 =
    configData.REACT_APP_API_SRCM_API_URI || "https://profile.srcm.net/api/v2";
  config.apiURL =
    configData.REACT_APP_API_API_URI ||
    "https://writenodeedu.heartfulness.org/proposaleportal-qa/public/api/v1/";
  config.evalutionURL =
    configData.REACT_APP_API_API_URI ||
    "https://writenodeedu.heartfulness.org/proposaleportal-qa/public/";
} catch {
  // config.awGtagCode = 'AW-854824176/pzEJCL2dj_8CEPCpzpcD';
  config.srcmApi = "https://static-gatsby-qa.web.app/srcmapi/";
  config.srcmApiv2 =
    configData.REACT_APP_API_SRCM_API_URI || "https://profile.srcm.net/api/v2";
  config.evalutionURL =
    configData.REACT_APP_API_API_URI ||
    "https://writenodeedu.heartfulness.org/proposaleportal-qa/public/";
}

config.imageUrl = "";
config.clientId = "sNoCucDYc1ok5D8HzktKJUROtXGlD49tSGIPiXzn";

module.exports = config;
