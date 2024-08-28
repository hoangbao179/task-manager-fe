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
import { Controller, useForm } from 'react-hook-form';
import { ICalendarEventForm } from '../../models/Calendar/calendar-event.form';
import { IUserForm } from '../../models/User/IUserForm';
interface SignUpDialogProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignUpDialog: React.FC<SignUpDialogProps> = ({ open, onClose, onSwitchToLogin }) => {
  const [snackbarOption, setSnackbarOption] = useState<ISnackbarOption>({ open: false, type: 'success', messages: '' });
  const [submitting, setSubmitting] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<IUserForm>({ mode: 'all' });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const handleCloseSnackbar = (): void => {
    setSnackbarOption({
      ...snackbarOption,
      open: false,
      messages: ''
    });
  };

  const handleSignUp = async (data: IUserForm) => {
    if (!data.email || !data.password) {
      return;
    }
    try {
      await AuthService.register(data)
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
        <DialogContent style={{ width: '500px' }}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: 'First name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="First name"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{ required: 'Last name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Last name"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
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
          <OkButtonDialog onClick={handleSubmit(handleSignUp)} variant="outlined" disabled={submitting}><TypographyButton>Sign Up</TypographyButton></OkButtonDialog>
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
