import axios from 'axios';
import { API_URL } from '../../constants';

export function fetchUsers() {
  return axios.get(`${API_URL}/users`);
}

export function fetchUser(id) {
  return axios.get(`${API_URL}/users/${id}`);
}

export function createUser(user) {
  return axios.post(`${API_URL}/users`, user);
}

export function updateUser(user) {
  return axios.put(`${API_URL}/users/${user.id}`, user);
}

export function deleteUser(id) {
  return axios.delete(`${API_URL}/users/${id}`);
}
