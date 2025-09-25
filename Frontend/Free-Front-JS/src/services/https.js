import httpRequest from '@/httpsRequest';

const https = {
  gettesthttps(payload) {
    return httpRequest.post('/test', payload);
  },

};

export default https;
