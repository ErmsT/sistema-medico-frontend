import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}api/auth/login`, credentials);
  return response;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}api/auth/register`, userData);
  return response;
};

export const getDoctors = async () => {
  const response = await axios.get(`${API_URL}api/doctors`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const getPatients = async () => {
  const response = await axios.get(`${API_URL}api/patients`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const linkPatient = async (doctorId, patientId) => {
  const response = await axios.post(
    `${API_URL}api/doctors/link`,
    { doctorId, patientId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
};

export const linkDoctor = async (doctorId) => {
  const response = await axios.post(
    `${API_URL}api/patients/link`,
    { doctorId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
};

export const unlinkPatient = async (doctorId, patientId) => {
  const response = await axios.post(
    `${API_URL}api/doctors/unlink`,
    { doctorId, patientId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
};

export const editPatient = async (name, password) => {
   const response = await axios.put(
     `${API_URL}api/patients/edit`,
     { name, password },
     {
       headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
       },
     }
   );
   return response.data;
};

export const editDoctor = async (name, specialty, password) => {
  const response = await axios.put(
    `${API_URL}api/doctors/edit`,
    { name, specialty, password },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
};