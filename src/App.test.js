import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the login page', () => {
  render(<App />);
  const loginElement = screen.getByText(/Entrar/i);  // Certifique-se que o texto corresponde ao esperado
  expect(loginElement).toBeInTheDocument();
});
