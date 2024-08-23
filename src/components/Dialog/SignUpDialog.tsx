import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { AuthService } from '../../services/auth/auth.service';

interface SignUpDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignUpDialog: React.FC<SignUpDialogProps> = ({ open, onClose, onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setFullName('');
      setEmail('');
      setPassword('');
      setError(null);
    }
  }, [open]);

  const handleSignUp = async () => {
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await AuthService.signUp(fullName, email, password);
      onClose();
      onSwitchToLogin(); 
    } catch (error) {
      setError('Registration failed! Please check your information again');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Full name"
          fullWidth
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
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
        <Button onClick={handleSignUp}>Sign Up</Button>
      </DialogActions>
      <div style={{ padding: '10px', textAlign: 'center' }}>
        <Button onClick={onSwitchToLogin}>Already have an account? Log in</Button>
      </div>
    </Dialog>
  );
};

export default SignUpDialog;
