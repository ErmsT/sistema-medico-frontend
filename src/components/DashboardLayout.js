import React from 'react';
import { Container, Typography } from '@mui/material';

const DashboardLayout = ({ title, children }) => {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        {title}
      </Typography>
      {children}
    </Container>
  );
};

export default DashboardLayout;
