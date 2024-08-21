import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import { AuthService } from '../../services/auth/auth.service';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setEmail('');
      setPassword('');
      setError(null);
    }
  }, [open]);

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data?.token); 
      alert('Login successful!');
      onClose();
    } catch (error) {
      setError('Login failed! Please check your information again.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Đăng Nhập</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleLogin}>Login</Button>
      </DialogActions>
      <Box style={{ padding: '10px', textAlign: 'center' }}>
        <Button onClick={onSwitchToSignUp}>Don't have an account? Sign up</Button>
      </Box>
    </Dialog>
  );
};

export default LoginDialog;
