import { Box } from '@mui/material';
import { SignupPayload } from '../authSlice';
import React from 'react';
import SignUpForm from '../components/SignUpForm';
import { useAppDispatch } from 'app/hooks';
import { authActions } from '../authSlice';

export default function SignUpPage() {
  const dispatch = useAppDispatch();
  const handleSignUpFormSubmit = (formValues: SignupPayload) => {
    // dispatch action sigup to AuthSlice and slice
    dispatch(
      authActions.signup(formValues)
    );
  };

  return (
    <Box>
      <Box mt={3}>
        <SignUpForm onSubmit={handleSignUpFormSubmit} />
      </Box>
    </Box>
  );
}
