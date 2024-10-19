import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const DataConsent = ({ onConsent }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding="20px"
    >
      <Typography variant="h5" gutterBottom>
        Consentimento para o Uso de Dados
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Nós utilizamos cookies e dados pessoais para melhorar sua experiência. Ao continuar, você concorda com nossa
        política de privacidade.
      </Typography>
      <Button variant="contained" color="primary" onClick={onConsent} style={{ marginTop: '20px' }}>
        Aceitar
      </Button>
    </Box>
  );
};

export default DataConsent;
