import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { Alert } from '@material-ui/lab';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';
import { SignupPayload } from '../authSlice';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

export interface SignUpFormProps {
  onSubmit?: (formValues: SignupPayload) => void;
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter first name.'),
  lastName: yup
    .string()
    .required('Please enter last name.'),
  email: yup
    .string()
    .required('Please enter email')
    .test('two-words', 'Email not valid', (value) => {
        if (!value) return true;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(mailformat))
            {
            return true;
        }
        else {
            return false;
        }
    }),
  username: yup
    .string()
    .required('Please enter username.'),
  password: yup
    .string()
    .required('Please enter password.'),
  password_confirmation: yup
    .string()
    .required('Please enter password.'),
});

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
  const { t } = useTranslation()
  const [error, setError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupPayload>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: SignupPayload) => {
    try {
      // Clear previous submission error
      setError('');
      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error.message);
    }
  };
const theme = createTheme();
return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Link to="/admin/students">
            </Link>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 1 }}>
                <InputField name="firstName" required control={control} label="First name" />
                <InputField name="lastName" required control={control} label="Last name" />
                <InputField name="email" required control={control} label="Email" />
                <InputField name="username" required control={control} label="User name" />
                <InputField name="password" required control={control} label="Password" />
                <InputField name="password_confirmation" required control={control} label="Password confirmation" />
                {error && <Alert severity="error">{error}</Alert>}

                <Box mt={3}>
                <LoadingButton
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
            >
                {t('Sign Up')}
            </LoadingButton>
            </Box>
                <Grid container>
                    <Grid item>
                        <Link to="/login">
                            {"Already have an account"}
                        </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
  );
}
