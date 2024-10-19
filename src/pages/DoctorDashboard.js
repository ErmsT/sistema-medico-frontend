import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Button, Typography, Divider } from '@mui/material';
import { getPatients, linkPatient, unlinkPatient } from '../services/api';
import DashboardLayout from '../components/DashboardLayout';
import UserDrawer from '../components/UserDrawer';

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [linkedPatients, setLinkedPatients] = useState([]);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (!user) return;

    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        setPatients(response);
        const linkedPatientIds = user.patients || [];
        const alreadyLinkedPatients = response.filter((patient) =>
          linkedPatientIds.includes(patient._id)
        );
        setLinkedPatients(alreadyLinkedPatients);
      } catch (err) {
        console.error('Erro ao buscar pacientes:', err);
      }
    };

    fetchPatients();
  }, [user]);

  const handleLinkPatient = async (patientId) => {
    try {
      await linkPatient(user._id, patientId);
      const patient = patients.find((p) => p._id === patientId);
      setLinkedPatients((prev) => [...prev, patient]);
      setPatients((prev) => prev.filter((p) => p._id !== patientId));

      const updatedUser = { ...user, patients: [...user.patients, patientId] };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Erro ao vincular paciente:', err);
    }
  };

  const handleUnlinkPatient = async (patientId) => {
    try {
      await unlinkPatient(user._id, patientId);
      const patient = linkedPatients.find((p) => p._id === patientId);
      setPatients((prev) => [...prev, patient]);
      setLinkedPatients((prev) => prev.filter((p) => p._id !== patientId));

      const updatedUser = { ...user, patients: user.patients.filter((id) => id !== patientId) };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Erro ao desvincular paciente:', err);
    }
  };

  return (
    <DashboardLayout title="Dashboard Médico">
      <UserDrawer user={user}  setUser={setUser} />

      <Typography variant="h5" gutterBottom>
        Pacientes Disponíveis para Vínculo
      </Typography>
      <List>
        {patients.length > 0 ? (
          patients
            .filter((patient) => !user.patients.includes(patient._id))
            .map((patient) => (
              <ListItem key={patient._id}>
                <ListItemText primary={patient.name} />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleLinkPatient(patient._id)}
                  style={{ marginLeft: '10px', padding: '5px 10px' }}
                >
                  Vincular
                </Button>
              </ListItem>
            ))
        ) : (
          <Typography>Não há pacientes disponíveis para vínculo.</Typography>
        )}
      </List>

      <Divider style={{ margin: '20px 0' }} />

      <Typography variant="h5" gutterBottom>
        Pacientes Vinculados
      </Typography>
      <List>
        {linkedPatients.length > 0 ? (
          linkedPatients.map((patient) => (
            <ListItem key={patient._id + "vinculados"}>
              <ListItemText primary={patient.name} />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleUnlinkPatient(patient._id)}
                style={{ marginLeft: '10px', padding: '5px 10px' }}
              >
                Desvincular
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography>Você não tem pacientes vinculados no momento.</Typography>
        )}
      </List>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
