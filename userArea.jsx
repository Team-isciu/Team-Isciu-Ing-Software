import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, BASE_URL } from '../constants';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
} from '@mui/material';

const UserArea = () => {
  const [view, setView] = useState('reset');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleResetPassword = async (currentPsw, psw, pswConf) => {
    try {
      console.log(localStorage.getItem('data'))
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/auth/change-password`,
        {
          currentPassword: currentPsw,
          password: psw,
          passwordConfirmation: pswConf,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Password changed successfully:", response.data);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'currentPassword') {
      setCurrentPassword(e.target.value);
    } else if (e.target.name === 'newPassword') {
      setNewPassword(e.target.value);
    }
  };

  const handleSubmit = () => {
    handleResetPassword(currentPassword, newPassword, newPassword);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/graphql`, {
        query: `
          query {
            singolaRicercas {
              data {
                id
                attributes {
                  dataRicerca
                  testoRicerca
                  Username
                }
              }
            }
          }
        `
      });

      const result = response.data.data.singolaRicercas.data;
      const targetUsername = localStorage.getItem('username');
      const filtered = result.filter(item =>
        item.attributes.Username === targetUsername
      );
      setFilteredData(filtered);
    } catch (error) {
      console.error('Error fetching data:', error.response.data);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          position: 'fixed',
          top: '70px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          padding: '20px',
          zIndex: '1000',
          width: '200px',
        }}
      >
        <Button
          variant={view === 'reset' ? 'contained' : 'outlined'}
          onClick={() => {
            setView('reset');
            setShowPasswordInput(true);
          }}
          sx={{ display: 'block', marginBottom: '10px' }}
        >
          Resetta Password
        </Button>
        <Button
          variant={view === 'viewLog' ? 'contained' : 'outlined'}
          onClick={() => {
            setView('viewLog');
            setShowPasswordInput(false);
          }}
          sx={{ display: 'block', marginBottom: '10px' }}
        >
          Visualizza Log
        </Button>
      </Box>
      {showPasswordInput && (
        <Box
          sx={{
            position: 'fixed',
            top: '70px',
            left: '240px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            padding: '20px',
            zIndex: '1000',
            width: '400px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            type="password"
            label="Password Attuale"
            variant="outlined"
            name="currentPassword"
            onChange={handleInputChange}
            sx={{ mr: 1 }}
          />
          <TextField
            type="password"
            label="Nuova Password"
            variant="outlined"
            name="newPassword"
            value={newPassword}
            onChange={handleInputChange}
            sx={{ mr: 1 }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Invia
          </Button>
        </Box>
      )}
      <Box sx={{ mt: '570px', pb: 10 }}>
        {view === 'viewLog' && (
          <Box sx={{ mt: 2 }}>
            <h1>User's Log</h1>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Data Ricerca</TableCell>
                    <TableCell>Testo Ricerca</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.attributes.Username}</TableCell>
                      <TableCell>{item.attributes.dataRicerca}</TableCell>
                      <TableCell>{item.attributes.testoRicerca}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        <Box sx={{ mt: 4 }} />
      </Box>
    </Box>
  );
};

export default UserArea;
