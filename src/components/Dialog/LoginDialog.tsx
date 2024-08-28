import React, { useState, useEffect, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, colors, Snackbar, Alert, IconButton } from '@mui/material';
import { AuthService } from '../../services/auth/auth.service';
import { CancelButtonDialog, OkButtonDialog } from '../Button/Dialog/button-dialog.styles';
import { DialogActionsWrapper, TypographyButton } from './dialog.styles';
import CloseIcon from '@mui/icons-material/Close';
import LoadingSectionComponent from '../LoadingSection';
import { ISnackbarOption } from '../../models/ISnackbarOption';
import { HttpStatusCode } from 'axios';
import { CALENDAR_LOCAL, CURRENT_USER, MSG_ERROR_COMMON, TOKEN } from '../../constants/common';
import { FormValidateConfig } from '../../utils/helper/helper';
import { AccountService } from '../../services/user/account.service';
import { AppContext } from '../../contexts/AppContext';
import { UserDetail } from '../../models/User/UserDetail';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [snackbarOption, setSnackbarOption] = useState<ISnackbarOption>({ open: false, type: 'success', messages: '' });
  const [submitting, setSubmitting] = useState(false);
  const {setCurrentUser} = useContext(AppContext);

  useEffect(() => {
    if (!open) {
      setEmail('');
      setPassword('');
      setEmailError(null);
      setPasswordError(null);
    }
  }, [open]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (!FormValidateConfig.Pattern.Email.test(emailValue)) {
      setEmailError('Email not valid!');
      return;
    }
    setEmailError(null);
    
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    if (passwordValue.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    setPasswordError(null);
  };

  const getCurrentUser = async () => {
    AccountService.getCurrentUser().then((result) => {
      if (result.statusCode === HttpStatusCode.Ok) {
        localStorage.setItem(CURRENT_USER, JSON.stringify(result.data));
        setCurrentUser(result.data as UserDetail);
      }
    });
  }

  const handleLogin = async () => {
    if (!!emailError || !!passwordError || !email || !password) {
      return;
    }
    try {
      await AuthService.login(email, password).then((result) => {
        if (result.statusCode === HttpStatusCode.Ok) {
          localStorage.setItem(TOKEN, result.data);
          localStorage.removeItem(CALENDAR_LOCAL);
          onClose();
          getCurrentUser();
          setSnackbarOption({
            open: true,
            type: 'success',
            messages: "Login successfully!"
          });
        }
      })
        .catch(() => {
          setSnackbarOption({
            open: true,
            type: 'error',
            messages: 'Email or password is incorrect!'
          });
        })
        .finally(() => {
          setSubmitting(false);
        });

      onClose();
    } catch (error) {
      setSnackbarOption({
        open: true,
        type: 'error',
        messages: MSG_ERROR_COMMON
      });
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
        <DialogContent style={{width : '500px'}}>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            helperText={emailError}
            FormHelperTextProps={{
              style: { width: '300px', color: emailError ? 'red' : undefined },
            }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            helperText={passwordError}FormHelperTextProps={{
              style: { width: '300px', color: passwordError ? 'red' : undefined },
            }}
          />

        </DialogContent>
        <DialogActionsWrapper>
          <CancelButtonDialog onClick={onClose} variant="outlined">Cancel</CancelButtonDialog>
          <OkButtonDialog onClick={handleLogin} variant="outlined"  disabled={!!emailError || !!passwordError || !email || !password}><TypographyButton>OK</TypographyButton></OkButtonDialog>
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
