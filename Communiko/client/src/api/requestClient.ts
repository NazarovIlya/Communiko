import axios, { AxiosResponse } from 'axios'
import { Activeness } from '../model/Activeness';

axios.defaults.baseURL = 'http://localhost:11222/api';

const responseData = <T>(res: AxiosResponse<T>) => res.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseData),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseData),
  put: <T>(url: string, content: {}) => axios.put<T>(url, content).then(responseData)
}

const Activities = {
  items: () => requests.get<Activeness[]>('/Activeness'),
  remove: (id: string) => requests.delete<void>(`/Activeness/${id}`),
  update: (item: Activeness) => requests.put<void>(`/Activeness/${item.id}`, item),
}

const client = {
  Activities
}

export default client;