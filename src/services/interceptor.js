import { lStorage } from "../utils/storage";

const interceptor = (ax, abhyasis) => {
  ax.interceptors.request.use(
    (config) => {
      let adminCheck =
        typeof window !== "undefined" &&
        window.location.pathname.includes("/admin");
      let superadminCheck =
        typeof window !== "undefined" &&
        window.location.pathname.includes("/superadmin");
      const abhyasisId =
        typeof window !== "undefined" && lStorage.get("hfn-profile-me") !== ""
          ? lStorage.get("hfn-profile-me").me
          : null;
      let stringfyVal;
      if (adminCheck === true) {
        stringfyVal =
          typeof window !== "undefined" &&
          lStorage.get("authInfo-sadmin") !== ""
            ? lStorage.get("authInfo-sadmin")
            : null;
      } else if (superadminCheck === true) {
        stringfyVal =
          typeof window !== "undefined" &&
          lStorage.get("authInfo-sadmin") !== ""
            ? lStorage.get("authInfo-sadmin")
            : null;
      } else {
        stringfyVal =
          typeof window !== "undefined" && lStorage.get("authInfo") !== ""
            ? lStorage.get("authInfo")
            : null;
      }
      let parseData = stringfyVal && stringfyVal ? JSON.parse(stringfyVal) : "";
      const token = parseData !== "" ? parseData.token : "";
      config.headers = {
        Authorization: token,
        abhyasiId: abhyasisId.ref,
        "Content-Type": "application/json",
      };

      return config;
    },

    (error) => {
      Promise.reject(error);
      console.log(error);
    }
  );
  abhyasis.interceptors.request.use(
    (config) => {
      let adminCheck =
        typeof window !== "undefined" &&
        window.location.pathname.includes("/admin");
      let superadminCheck =
        typeof window !== "undefined" &&
        window.location.pathname.includes("/superadmin");
      let stringfyVal;
      if (adminCheck === true) {
        stringfyVal =
          typeof window !== "undefined" &&
          lStorage.get("authInfo-sadmin") !== ""
            ? lStorage.get("authInfo-sadmin")
            : null;
      } else if (superadminCheck === true) {
        stringfyVal =
          typeof window !== "undefined" &&
          lStorage.get("authInfo-sadmin") !== ""
            ? lStorage.get("authInfo-sadmin")
            : null;
      } else {
        stringfyVal =
          typeof window !== "undefined" && lStorage.get("authInfo") !== ""
            ? lStorage.get("authInfo")
            : null;
      }
      let parseData = stringfyVal && stringfyVal ? JSON.parse(stringfyVal) : "";
      const token = parseData !== "" ? parseData.token : "";
      config.headers = {
        Authorization: token,
        "Content-Type": "application/json",
        "x-client-id": "sNoCucDYc1ok5D8HzktKJUROtXGlD49tSGIPiXzn",
      };
      return config;
    },

    (error) => {
      Promise.reject(error);
      console.log(error);
    }
  );

  ax.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  abhyasis.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export { interceptor };
