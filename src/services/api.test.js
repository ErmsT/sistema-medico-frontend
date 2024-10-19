import axios from 'axios';
import { getDoctors } from './api';

jest.mock('axios');

describe('API Tests', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  test('retorna a lista de médicos', async () => {
    const mockDoctors = [{ _id: '1', name: 'Dr. Teste' }];
    axios.get.mockResolvedValue({ data: mockDoctors });

    const doctors = await getDoctors();
    expect(doctors).toEqual(mockDoctors);
  });

  test('trata erro ao tentar obter a lista de médicos', async () => {
    const mockError = new Error('Erro ao buscar médicos');
    axios.get.mockRejectedValue(mockError);

    try {
      await getDoctors();
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
