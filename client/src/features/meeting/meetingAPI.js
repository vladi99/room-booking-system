import axios from 'axios';
import { API_URL } from '../../constants';

export function fetchMeetings(userId) {
  return axios.get(`${API_URL}/users/${userId}/meetings`);
}

export function fetchMeeting(userId, id) {
  return axios.get(`${API_URL}/users/${userId}/meetings/${id}`);
}

export function createMeeting(userId, meeting) {
  return axios.post(`${API_URL}/users/${userId}/meetings`, meeting);
}

export function updateMeeting(userId, meeting) {
  return axios.put(`${API_URL}/users/${userId}/meetings/${meeting.id}`, meeting);
}

export function deleteMeeting(userId, id) {
  return axios.delete(`${API_URL}/users/${userId}/meetings/${id}`);
}
