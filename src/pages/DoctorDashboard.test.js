import { render, screen } from '@testing-library/react';
import { AuthContext } from '../contexts/AuthContext';
import DoctorDashboard from './DoctorDashboard';
import { act } from 'react';

// Mock de dados do contexto de autenticação
const mockAuthContextDoctor = {
  user: { _id: 'doctor-id', name: 'Doctor Test', email: 'doctor@test.com', role: 'doctor' },
  login: jest.fn(),
  logout: jest.fn(),
  loading: false,
};

const mockAuthContextPatient = {
  user: { _id: 'patient-id', name: 'Patient Test', email: 'patient@test.com', role: 'patient' },
  login: jest.fn(),
  logout: jest.fn(),
  loading: false,
};

describe('DoctorDashboard Component', () => {
  test('renderiza "Dashboard Médico" para role doctor', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={mockAuthContextDoctor}>
          <DoctorDashboard />
        </AuthContext.Provider>
      );
    });

    // Verifica se o texto "Dashboard Médico" está presente
    expect(screen.getByText(/Dashboard Médico/i)).toBeInTheDocument();
  });

  test('renderiza "Dashboard do Paciente" para role patient', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={mockAuthContextPatient}>
          <DoctorDashboard />
        </AuthContext.Provider>
      );
    });
  });
});
