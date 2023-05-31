// import CryptoJS from 'crypto-js';

// const $secretKey = "$AuthInfoLock$"

const lStorage = {

  set: (key, val) => {

    let stringfyVal, encriptData;

    stringfyVal = JSON.stringify(val);

    encriptData = stringfyVal.toString();

    localStorage.setItem(key, encriptData);

  },

  get: (key) => {

    let val, bytes, originalText;

    val = localStorage.getItem(key);

    if (val) {
      bytes = val;
      originalText = bytes.toString();
      return JSON.parse(originalText);
    }

  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  clear: (key) => {
    localStorage.clear(key);
  }

}

const sStorage = {

  set: (key, val) => {
    sessionStorage.setItem(key, val);
  },

  get: (key) => {
    let val = sessionStorage.getItem(key);
    return JSON.parse(val);
  },

  remove: (key) => {
    sessionStorage.removeItem(key);
  },

  clear: (key) => {
    sessionStorage.clear(key);
  }

}

export { lStorage, sStorage };