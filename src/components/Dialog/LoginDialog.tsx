import React, { useState, useEffect, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, colors, Snackbar, Alert, IconButton } from '@mui/material';
import { AuthService } from '../../services/auth/auth.service';
import { CancelButtonDialog, OkButtonDialog } from '../Button/Dialog/button-dialog.styles';
import { DialogActionsWrapper, TypographyButton } from './dialog.styles';
import CloseIcon from '@mui/icons-material/Close';
import LoadingSectionComponent from '../LoadingSection';
import { ISnackbarOption } from '../../models/ISnackbarOption';
import { HttpStatusCode } from 'axios';
import { LOCAL_CALENDAR, CURRENT_USER, MSG_ERROR_COMMON, TOKEN } from '../../constants/common';
import { FormValidateConfig } from '../../utils/helper/helper';
import { AccountService } from '../../services/user/account.service';
import { AppContext } from '../../contexts/AppContext';
import { UserDetail } from '../../models/User/UserDetail';
import { Controller, useForm } from 'react-hook-form';
import { ILoginForm } from '../../models/User/ILoginForm';

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
  const { setCurrentUser } = useContext(AppContext);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<ILoginForm>({ mode: 'all'});
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const getCurrentUser = async () => {
    AccountService.getCurrentUser().then((result) => {
      if (result.statusCode === HttpStatusCode.Ok) {
        localStorage.setItem(CURRENT_USER, JSON.stringify(result.data));
        setCurrentUser(result.data as UserDetail);
      }
    });
  }

  const handleLogin = async (loginForm: ILoginForm ) => {
    if (!loginForm.email || !loginForm.password) {
      return;
    }
    try {
      await AuthService.login(loginForm).then((result) => {
        if (result.statusCode === HttpStatusCode.Ok) {
          localStorage.setItem(TOKEN, result.data);
          localStorage.removeItem(LOCAL_CALENDAR);
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
        <DialogContent style={{ width: '500px' }}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: FormValidateConfig.Pattern.Email,
                message: 'Email not valid!',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </DialogContent>


        <DialogActionsWrapper>
          <CancelButtonDialog onClick={onClose} variant="outlined">Cancel</CancelButtonDialog>
          <OkButtonDialog onClick={handleSubmit(handleLogin)} variant="outlined" disabled={submitting}><TypographyButton>OK</TypographyButton></OkButtonDialog>
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
