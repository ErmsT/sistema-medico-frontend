import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Typography, Divider, Alert } from '@mui/material';
import { getDoctors, linkDoctor } from '../services/api';
import DashboardLayout from '../components/DashboardLayout';
import UserDrawer from '../components/UserDrawer';

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [linkedDoctor, setLinkedDoctor] = useState(null);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response);

        const linkedDoc = response.find((doc) => doc._id === user.doctorId);
        setLinkedDoctor(linkedDoc);
      } catch (err) {
        console.error('Erro ao buscar médicos:', err);
      }
    };

    fetchDoctors();
  }, [user.doctorId]);

  const handleLinkDoctor = async (doctorId) => {
    try {
      await linkDoctor(doctorId);
      const doctor = doctors.find((d) => d._id === doctorId);
      setLinkedDoctor(doctor);
      setUser((prev) => ({ ...prev, doctorId }));
      localStorage.setItem('user', JSON.stringify({ ...user, doctorId }));
    } catch (err) {
      console.error('Erro ao vincular médico:', err);
    }
  };

  return (
    <DashboardLayout title="Dashboard do Paciente">
      <UserDrawer user={user}  setUser={setUser} />

      {linkedDoctor && (
        <Alert severity="info" style={{ marginBottom: '20px' }}>
          Você já tem um médico vinculado: {linkedDoctor.name} ({linkedDoctor.specialty})
        </Alert>
      )}

      <Typography variant="h5" gutterBottom>
        Médicos Disponíveis para Vínculo
      </Typography>
      <List>
        {doctors.length > 0 ? (
          doctors
            .filter((doctor) => !user.doctorId || doctor._id !== user.doctorId)
            .map((doctor) => (
              <ListItem key={doctor._id}>
                <ListItemText primary={doctor.name} secondary={`Especialidade: ${doctor.specialty}`} />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleLinkDoctor(doctor._id)}
                  disabled={!!linkedDoctor}
                >
                  Vincular
                </Button>
              </ListItem>
            ))
        ) : (
          <Typography>Não há médicos disponíveis para vínculo.</Typography>
        )}
      </List>

      <Divider style={{ margin: '20px 0' }} />

      <Typography variant="h5" gutterBottom>
        Médico Vinculado
      </Typography>
      {linkedDoctor ? (
        <List>
          <ListItem key={linkedDoctor._id}>
            <ListItemText primary={linkedDoctor.name} secondary={`Especialidade: ${linkedDoctor.specialty}`} />
          </ListItem>
        </List>
      ) : (
        <Typography>Você não tem um médico vinculado no momento.</Typography>
      )}
    </DashboardLayout>
  );
};

export default PatientDashboard;
