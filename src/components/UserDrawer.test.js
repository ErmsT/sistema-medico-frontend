import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';  // Importando act de react
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import UserDrawer from './UserDrawer';

const mockUser = {
  name: 'Teste User',
  email: 'teste@user.com',
  role: 'doctor',
  specialty: 'Cardiologista',
};

const mockAuthContextValue = {
  logout: jest.fn(),
};

describe('UserDrawer Component', () => {
  test('renderiza as informações do usuário corretamente', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={mockAuthContextValue}>
          <MemoryRouter>
            <UserDrawer user={mockUser} />
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });

    fireEvent.click(screen.getByText(/Perfil/i));
    expect(screen.getByText(/Teste User/i)).toBeInTheDocument();
    expect(screen.getByText(/teste@user.com/i)).toBeInTheDocument();
  });
});
