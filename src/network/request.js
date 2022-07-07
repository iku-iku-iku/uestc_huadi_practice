import axios from "axios";
axios.defaults.retry = 4;
axios.defaults.retryDelay = 5000;
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config;
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function () {
    return axios(config);
  });
});
export function request(config) {
  const instance = axios.create({
    baseURL: "http://company-compare.natapp1.cc",
    timeout: 5000,
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
      return Promise.reject(error);
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
