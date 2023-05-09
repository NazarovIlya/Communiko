import axios, { AxiosResponse } from 'axios'
import { Activeness } from '../model/Activeness';
import { toast } from 'react-toastify';
import { router } from '../router/Router';
import { User } from '../model/user';
import { UserForm } from "../model/UserForm";
import { repository } from '../repository/Repository';

axios.defaults.baseURL = 'http://localhost:11222/api';

const responseData = <T>(res: AxiosResponse<T>) => res.data;

const sleep = (delay: number) => {
  return new Promise((res) => { setTimeout(res, delay); });
}

axios.interceptors.request.use(config => {
  const token = repository.authRepo.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
})

axios.interceptors.response.use(async response => {
  await sleep(0);
  toast.info('Сообщение');
  return response;
}, (error) => {
  const { status } = error.response;
  switch (status) {
    case 404:
      toast.error('Ошибка 404');
      router.navigate('/not-found');
      break;
    case 401:
      toast.error('401 Пользователь не авторизован');
      break;
    default:
      toast.info('Другая ошибка');
      break;
  }
  return Promise.reject(error);
});

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseData),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseData),
  put: <T>(url: string, content: {}) => axios.put<T>(url, content).then(responseData),
  post: <T>(url: string, content: {}) => axios.post<T>(url, content).then(responseData)
}

const Activities = {
  items: () => requests.get<Activeness[]>('/Activeness'),
  remove: (id: string) => requests.delete<void>(`/Activeness/${id}`),
  update: (item: Activeness) => requests.put<void>(`/Activeness/${item.id}`, item),
  create: (item: Activeness) => requests.post<void>(`/Activeness/`, item),
  item: (id: string) => requests.get<Activeness>(`/Activeness/${id}`),
}

const Account = {
  current: () => requests.get<User>('/Account/current'),
  auth: (user: UserForm) => requests.post<User>('/Account/auth', user),
  register: (user: UserForm) => requests.post<User>('/Account/registration', user)
}

const client = {
  Activities,
  Account
}

export default client;