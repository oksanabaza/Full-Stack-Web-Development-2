import React, { useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { AuthContext } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const { signout } = useContext(AuthContext) || {};
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    if (signout) {
      signout();
      handleClose(); 
    //   navigate('/login'); 
    }
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Logout
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutButton;
