import axios from 'axios';

const createHttpRequest = (apiUrl) => {
  const instance = axios.create({
    baseURL: apiUrl,
    timeout: 120000
  });

  instance.defaults.headers.common['Content-Type'] = 'application/json';

  instance.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error.response?.data);
    }
  );

  const setHeader = (key, value) => {
    instance.defaults.headers.common[key] = value;
  };

  const setAuthorization = (token) => {
    instance.defaults.headers.common['Authorization'] = token;
  };

  return {
    instance,
    get: instance.get,
    put: instance.put,
    post: instance.post,
    delete: instance.delete,
    patch: instance.patch,
    setHeader,
    setAuthorization
  };
};

export default createHttpRequest;
