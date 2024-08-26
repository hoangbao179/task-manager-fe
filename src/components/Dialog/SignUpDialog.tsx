import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Snackbar, Alert, IconButton } from '@mui/material';
import { AuthService } from '../../services/auth/auth.service';
import { CancelButtonDialog, OkButtonDialog } from '../Button/Dialog/button-dialog.styles';
import { DialogActionsWrapper, TypographyButton } from './dialog.styles';
import { HttpStatusCode } from 'axios';
import LoadingSectionComponent from '../LoadingSection';
import CloseIcon from '@mui/icons-material/Close';
import { ISnackbarOption } from '../../models/ISnackbarOption';
import { MSG_ERROR_COMMON } from '../../constants/common';
import { FormValidateConfig } from '../../utils/helper/helper';
import { User } from '../../models/User/IUser';
interface SignUpDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignUpDialog: React.FC<SignUpDialogProps> = ({ open, onClose, onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOption, setSnackbarOption] = useState<ISnackbarOption>({ open: false, type: 'success', messages: '' });
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setFullName('');
      setEmail('');
      setPassword('');
    }
  }, [open]);
  

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (!FormValidateConfig.Pattern.Email.test(email)) {
      setEmailError('Email not valid!');
      return;
    }
    else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };


  const handleCloseSnackbar = (): void => {
    setSnackbarOption({
      ...snackbarOption,
      open: false,
      messages: ''
    });
  };
  
  const handleSignUp = async () => {
    if (!!emailError || !!passwordError || !email || !password) {
      return;
    }
    try {
      await AuthService.register(fullName, email, password)
        .then((result) => {
          if (result.statusCode === HttpStatusCode.Ok || result.statusCode === HttpStatusCode.Created) {
            setSnackbarOption({
              open: true,
              type: 'success',
              messages: "Register successfully!"
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
      onSwitchToLogin();
    } catch (error) {
      setSnackbarOption({
        open: true,
        type: 'error',
        messages: 'Registration failed! Please check your information again'
      });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent style={{width : '500px'}}>
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
          <OkButtonDialog onClick={handleSignUp} variant="outlined" disabled={!!emailError || !!passwordError || !email || !password}><TypographyButton>Sign Up</TypographyButton></OkButtonDialog>
        </DialogActionsWrapper>
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <Button onClick={onSwitchToLogin}>Already have an account? Log in</Button>
        </div>
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

export default SignUpDialog;
