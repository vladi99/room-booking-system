import axios from 'axios';
import { API_URL } from '../../constants';

export function fetchCompanies() {
  return axios.get(`${API_URL}/companies`);
}

export function fetchCompany(id) {
  return axios.get(`${API_URL}/companies/${id}`);
}

export function createCompany(company) {
  return axios.post(`${API_URL}/companies`, company);
}

export function updateCompany(company) {
  return axios.put(`${API_URL}/companies/${company.id}`, company);
}

export function deleteCompany(id) {
  return axios.delete(`${API_URL}/companies/${id}`);
}
