import axios from 'axios';

const axiosApiInstance = axios.create({
  baseURL: 'https://api.nessieisreal.com',
  params: {
    key: 'aa28cdb8b75a206af983b242bed387cc',
  },
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosApiInstance