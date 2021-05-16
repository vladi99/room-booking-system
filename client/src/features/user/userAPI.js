import axios from 'axios';
import { API_URL } from '../../constants';

export function fetchUsers() {
  return axios.get(`${API_URL}/users`);
}

export function createUser(data) {
  return axios.post(`${API_URL}/users`, data);
}
