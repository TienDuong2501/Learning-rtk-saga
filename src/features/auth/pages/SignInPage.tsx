import { Box } from '@mui/material';
import { LoginPayload } from '../authSlice';
import React from 'react';
import SignInForm from '../components/SignInForm';
import { useAppDispatch } from 'app/hooks';
import { authActions } from '../authSlice';

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const handleSignInFormSubmit = (formValues: LoginPayload) => {
    // dispatch action login to AuthSlice and slice
    dispatch(
      authActions.login(formValues)
    );
  };

  return (
    <Box>
      <Box mt={3}>
        <SignInForm onSubmit={handleSignInFormSubmit} />
      </Box>
    </Box>
  );
}
