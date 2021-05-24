import axios from 'axios';
import { API_URL } from '../../constants';

export function login(user) {
  return axios.post(`${API_URL}/auth`, user);
}
