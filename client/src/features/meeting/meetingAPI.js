import axios from 'axios';
import { API_URL } from '../../constants';

export function fetchMeetings() {
  return axios.get(`${API_URL}/meetings`);
}

export function fetchMeeting(id) {
  return axios.get(`${API_URL}/meetings/${id}`);
}

export function createMeeting(meeting) {
  return axios.post(`${API_URL}/meetings`, meeting);
}

export function updateMeeting(meeting) {
  return axios.put(`${API_URL}/meetings/${meeting.id}`, meeting);
}

export function deleteMeeting(id) {
  return axios.delete(`${API_URL}/meetings/${id}`);
}
