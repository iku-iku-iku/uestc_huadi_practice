import axios from "axios";
function retry(err, instance) {
  let config = err.config;
  if (!config || !config.retryTimes) return Promise.reject(err);
  const { __retryCount = 0, retryDelay = 300, retryTimes } = config;
  // 在请求对象上设置重试次数
  config.__retryCount = __retryCount;
  // 判断是否超过了重试次数
  if (__retryCount >= retryTimes) {
    return Promise.reject(err);
  }
  // 增加重试次数
  config.__retryCount++;
  // 延时处理
  const delay = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, retryDelay);
  });
  // 重新发起请求
  return delay.then(function () {
    console.log("接口" + err.config.url + "请求失败，重新请求");
    return instance(config);
  });
}
export function request(config) {
  const instance = axios.create({
    baseURL: "http://company-compare.natapp1.cc",
    timeout: 2000,
    retryTimes: 20,
    retryDelay: 1000,
  });

  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      return response.data;
    },
    function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return retry(error, instance);
    }
  );
  return instance(config);
}

export function requestInfo(ids, callback) {
  return Promise.allSettled(
    ids.map((i) =>
      request({
        method: "GET",
        url: `/college/${i}/detail_info`,
      })
    )
  )
    .then((res) => {
      callback(
        res
          .map((r) => {
            if (r.status === "rejected") return null;
            return r.value.data;
          })
          .filter((x) => x)
      );
    })
    .catch(console.log);
}
