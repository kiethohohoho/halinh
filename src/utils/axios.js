import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    login: '/api/user/login',
  },
  user: {
    list: '/api/user/getalluser',
    me: '/api/user/me',
    create: '/api/user/register',
    update: '/api/user/updateuser',
    updateProfile: '/api/user/updateprofile',
    delete: (id) => `/api/user/deleteuser?id=${id}`,
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/voucher/getlistvoucher2',
    gen: '/api/voucher/genvoucher',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  invoice: {
    list: '/api/bill/getallbill',
    create: '/api/bill/postbill',
  },
};
