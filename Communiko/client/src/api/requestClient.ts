import axios, { AxiosResponse } from 'axios'
import { Activeness } from '../model/Activeness';

axios.defaults.baseURL = 'http://localhost:11222/api';

const responseData = <T>(res: AxiosResponse<T>) => res.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseData),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseData)
}

const Activities = {
  items: () => requests.get<Activeness[]>('/Activeness'),
  remove: (id: string) => requests.delete<void>(`/Activeness/${id}`)
}

const client = {
  Activities
}

export default client;