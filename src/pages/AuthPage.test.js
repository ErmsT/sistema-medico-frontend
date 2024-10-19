import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthPage from './AuthPage';
import { AuthContext } from '../contexts/AuthContext';
import { act } from 'react';

// Mock da função login
jest.mock('../services/api', () => ({
  login: jest.fn(() => Promise.resolve({
    data: {
      user: { _id: 'mocked-id', email: 'test@test.com', role: 'patient' },
      token: 'mocked-token'
    }
  })),
  register: jest.fn()
}));

const mockLoginUser = jest.fn(); // Mock para o loginUser do contexto
const mockAuthContextValue = {
  user: null,
  login: mockLoginUser,
  logout: jest.fn(),
  loading: false,
};

describe('AuthPage Component', () => {
  test('renderiza sem falhas e permite interagir com o formulário', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={mockAuthContextValue}>
          <MemoryRouter initialEntries={['/']}>
            <AuthPage />
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    });

    // Nenhuma verificação, apenas renderização e interação
  });
});
