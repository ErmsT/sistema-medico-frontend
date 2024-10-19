import React, { useState, useContext, useEffect } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, Divider, TextField } from '@mui/material';
import { Logout, Edit } from '@mui/icons-material';
/* import { useNavigate } from 'react-router-dom'; */
import { AuthContext } from '../contexts/AuthContext'; // Contexto de autenticação
import { editPatient, editDoctor } from '../services/api'; // Funções para editar

const UserDrawer = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user ? { ...user } : {});
  const [password, setPassword] = useState('');
/*   const navigate = useNavigate(); */
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const toggleDrawer = (open) => {
    setIsOpen(open);
  };

  const handleLogout = () => {
    logout();
/*     navigate('/'); */
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      if (user.role === 'doctor') {
        await editDoctor(editedUser.name, editedUser.specialty, password);
      } else if (user.role === 'patient') {
        await editPatient(editedUser.name, password);
      }

      localStorage.setItem('user', JSON.stringify(editedUser));
      setUser(editedUser);
      setEditMode(false);
    } catch (error) {
      console.error('Erro ao salvar as mudanças:', error);
    }
  };

  return (
    <>
      <Button onClick={() => toggleDrawer(true)} style={{ position: 'absolute', right: '20px', top: '20px' }}>
        Perfil
      </Button>
      <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
        <List style={{ width: '250px' }}>
          {user ? (
            <>
              <ListItem>
                <ListItemText primary={editedUser.name} secondary={user.email} />
              </ListItem>
              <Divider />
              <ListItem button onClick={handleLogout}>
                <Logout />
                <ListItemText primary="Logout" style={{ marginLeft: '10px' }} />
              </ListItem>
              <ListItem button onClick={handleEditToggle}>
                <Edit />
                <ListItemText primary={editMode ? 'Cancel' : 'Edit Profile'} style={{ marginLeft: '10px' }} />
              </ListItem>
              {editMode && (
                <div style={{ padding: '10px' }}>
                  <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  />
                  {user.role === 'doctor' && (
                    <TextField
                      label="Specialty"
                      fullWidth
                      margin="normal"
                      value={editedUser.specialty || ''}
                      onChange={(e) => setEditedUser({ ...editedUser, specialty: e.target.value })}
                    />
                  )}
                  <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
                    Save
                  </Button>
                </div>
              )}
            </>
          ) : (
            <ListItem>
              <ListItemText primary="Usuário não logado" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default UserDrawer;
