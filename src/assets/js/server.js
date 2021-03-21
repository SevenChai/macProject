import axios from "axios";
import qs from "qs";
axios.defaults.timeout = 6000;
axios.interceptors.request.use(
  function(config) {
    //config.headers["Content-Type"] = `text/html; charset=utf-8`;
    //config.headers["Content-Type"] = `application/json`;
    config.headers["Content-Type"] = `application/x-www-form-urlencoded`;
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// axios.interceptors.response.use(
//   response => {
//     switch (response.data.code) {
//       case 101:
//         store.dispatch("login/invokeLogout");
//         router.replace({
//           path: "/login",
//           query: { redirect: router.currentRoute.fullPath }
//         });
//     }
//     return response;
//   },
//   error => {
//     Message({
//       message: "请求超时,请刷新重试",
//       type: "error"
//     });
//     return Promise.reject(error); // 返回接口返回的错误信息
//   }
// );
let https = {
  get: "",
  post: ""
};
https.post = function(api, data) {
  let params = qs.stringify(data);
  //let params = data || "";
  return new Promise((resolve, reject) => {
    axios
      .post(api, params)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        // console.log('请求失败');
        return error;
      });
  });
};
https.get = function(api, data) {
  // let params = qs.stringify(data);
  let params = data || "";
  return new Promise((resolve, reject) => {
    axios
      .get(api, params)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        // console.log('请求失败');
        return error;
      });
    // eslint-disable-next-line no-tabs
  });
};
export default https;
