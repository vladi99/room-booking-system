import axios from 'axios';
import { API_URL } from '../../constants';

export function fetchRooms() {
  return axios.get(`${API_URL}/rooms`);
}

export function fetchRoom(id) {
  return axios.get(`${API_URL}/rooms/${id}`);
}

export function createRoom(room) {
  return axios.post(`${API_URL}/rooms`, room);
}

export function updateRoom(room) {
  return axios.put(`${API_URL}/rooms/${room.id}`, room);
}

export function deleteRoom(id) {
  return axios.delete(`${API_URL}/rooms/${id}`);
}
