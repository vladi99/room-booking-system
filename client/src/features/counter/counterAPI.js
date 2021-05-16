import axios from 'axios';
import { API_URL } from '../../constants';

export function fetchCount() {
  return axios.get(`${API_URL}/counter`).then(data => data.counter);
}
