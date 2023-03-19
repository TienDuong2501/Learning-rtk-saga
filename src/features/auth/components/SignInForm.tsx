import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { Alert } from '@material-ui/lab';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';
import { LoginPayload } from '../authSlice';
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


export interface SignIpFormProps {
  onSubmit?: (formValues: LoginPayload) => void;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Please enter name.')
    .test('two-words', 'Please enter at least two words', (value) => {
      if (!value) return true;

      const parts = value?.split(' ') || [];
      return parts.filter((x) => Boolean(x)).length >= 2;
    }),
  password: yup
    .string()
    .required('Please enter password.')
    .test('two-words', 'Please enter at least two words', (value) => {
      if (!value) return true;

      const parts = value?.split(' ') || [];
      return parts.filter((x) => Boolean(x)).length >= 2;
    }),
});

export default function SignUpForm({ onSubmit }: SignIpFormProps) {
  const { t } = useTranslation()
  const [error, setError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginPayload>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: LoginPayload) => {
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
                <InputField name="username" required control={control} label="User name" />

                <InputField name="password" required control={control} label="Password" />

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
                { t('Sign In') }
            </LoadingButton>
            </Box>
                <Grid container>
                    <Grid item xs>
                    <Link to="/forgot-password">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link to="/signup">
                        {t("Don't have an account? Sign Up")}
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
