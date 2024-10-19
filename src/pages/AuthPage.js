import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { login, register } from '../services/api'; 

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const { login: loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const response = await login({ email, password, role });
        const { token, user } = response.data;
        console.log('loginUser chamado com:', user, token);
        loginUser(user, token);
      } else {
        const payload = { name, email, password, role };
        if (role === 'doctor') {
          payload.specialty = specialty;
        }
        await register(payload);
        setIsLogin(true);
        setError('Cadastro realizado com sucesso. Faça login.');
        setName('');
        setEmail('');
        setPassword('');
        setSpecialty('');
      }
    } catch (err) {
      setError('Erro ao realizar a operação. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        {isLogin ? 'Login' : 'Cadastro'}
      </Typography>
      {error && (
        <Typography color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}
      
      <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '20px' }}>
        <Grid item>
          <Button
            variant={role === 'patient' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setRole('patient')}
          >
            Paciente
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={role === 'doctor' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setRole('doctor')}
          >
            Médico
          </Button>
        </Grid>
      </Grid>

      <Box component="form" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              required
            />
            {role === 'doctor' && (
              <TextField
                label="Especialidade"
                fullWidth
                margin="normal"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                variant="outlined"
                required
              />
            )}
          </>
        )}

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          {isLogin ? 'Entrar' : 'Registrar'}
        </Button>
      </Box>
      <Box textAlign="center" marginTop={2}>
        <Button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Ainda não tem uma conta? Registre-se' : 'Já tem uma conta? Faça login'}
        </Button>
      </Box>
    </Container>
  );
};

export default AuthPage;
