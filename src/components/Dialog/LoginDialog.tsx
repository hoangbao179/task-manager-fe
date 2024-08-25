import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, colors, Snackbar, Alert, IconButton } from '@mui/material';
import { AuthService } from '../../services/auth/auth.service';
import { CancelButtonDialog, OkButtonDialog } from '../Button/Dialog/button-dialog.styles';
import { DialogActionsWrapper, TypographyButton } from './dialog.styles';
import CloseIcon from '@mui/icons-material/Close';
import LoadingSectionComponent from '../LoadingSection';
import { ISnackbarOption } from '../../models/ISnackbarOption';
import { HttpStatusCode } from 'axios';
import { MSG_ERROR_COMMON } from '../../constants/common';
interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [snackbarOption, setSnackbarOption] = useState<ISnackbarOption>({ open: false, type: 'success', messages: '' });
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (!open) {
      setEmail('');
      setPassword('');
      setError(null);
    }
  }, [open]);

  const handleLogin = async () => {
    try {
      await AuthService.login(email, password).then((result) => {
        if (result.statusCode === HttpStatusCode.Ok) {
          localStorage.setItem('token', result.data?.token);
          setSnackbarOption({
            open: true,
            type: 'success',
            messages: "Login successfully!"
          });
        }
        else {
          setSnackbarOption({
            open: true,
            type: 'error',
            messages: result.message
          });
        }
      })
      .catch(() => {
        setSnackbarOption({
          open: true,
          type: 'error',
          messages: MSG_ERROR_COMMON
        });
      })
      .finally(() => {
        setSubmitting(false);
      });

      onClose();
    } catch (error) {
      setError('Login failed! Please check your information again.');
    }
  };

  const handleCloseSnackbar = (): void => {
    setSnackbarOption({
      ...snackbarOption,
      open: false,
      messages: ''
    });
  };
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Login</DialogTitle>
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
        <DialogActionsWrapper>
          <CancelButtonDialog onClick={onClose} variant="outlined">Cancel</CancelButtonDialog>
          <OkButtonDialog onClick={handleLogin} variant="outlined"><TypographyButton>OK</TypographyButton></OkButtonDialog>
        </DialogActionsWrapper>
        <Box style={{ padding: '10px', textAlign: 'center' }}>
          <Button onClick={onSwitchToSignUp}>Don't have an account? Sign up</Button>
        </Box>
      </Dialog>
      <Snackbar
        open={snackbarOption.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={snackbarOption?.timeHidden || 2000}
        onClose={handleCloseSnackbar}
        security={snackbarOption.type}
      >
        <Alert
          onClose={handleCloseSnackbar}
          variant="filled"
          severity={snackbarOption.type}
          sx={{ width: '100%' }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              style={{ color: 'white' }}
              onClick={handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          }>
          {snackbarOption.messages}
        </Alert>
      </Snackbar>
      <LoadingSectionComponent
        isLoading={submitting}
        isShowBackdrop={true}>
      </LoadingSectionComponent>
    </>
  );
};

export default LoginDialog;
