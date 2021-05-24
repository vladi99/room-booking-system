import axios from 'axios';
import { API_URL } from '../../constants';

export function fetchRooms(companyId) {
  return axios.get(`${API_URL}/companies/${companyId}/rooms`);
}

export function fetchRoom(companyId, id) {
  return axios.get(`${API_URL}/companies/${companyId}/rooms/${id}`);
}

export function createRoom(companyId, room) {
  return axios.post(`${API_URL}/companies/${companyId}/rooms`, room);
}

export function updateRoom(companyId, room) {
  return axios.put(`${API_URL}/companies/${companyId}/rooms/${room.id}`, room);
}

export function deleteRoom(companyId, id) {
  return axios.delete(`${API_URL}/companies/${companyId}/rooms/${id}`);
}
