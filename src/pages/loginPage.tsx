import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';


const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { authenticate } = authContext || {};

  const login = () => {
    const password = Math.random().toString(36).substring(7);
    authenticate && authenticate('oksana@gmail.com', password);
  };

  return (
    <Box >
      <Card >
        <CardContent >
          <Typography>
            Login Page h
          </Typography>
          <Typography >
            Click the button to login
          </Typography>
          <Button
            variant="contained"
            onClick={login}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
