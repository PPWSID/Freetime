import httpRequest from '@/httpsRequest';
import { get } from 'lodash';

const dashboardService = {
  getFilter() {
    return httpRequest.get('/dashboard/filter');
  },
  getDataDoughnutData(payload) {
    return httpRequest.post('/dashboard/doughnut', payload);
  },
  getDataBarChart(payload) {
    return httpRequest.post('/dashboard/barchart', payload);
  },
  getDataTableList() {
    return httpRequest.get('/dashboard/tablelist');
  },
  getDataTable(payload) {
    return httpRequest.post('/dashboard/table', payload);
  }
};

export default dashboardService;
