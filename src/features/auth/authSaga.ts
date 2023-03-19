import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { call, delay, fork, put, take, takeLatest } from 'redux-saga/effects';
import { authActions, LoginPayload, SignupPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(5000);
    // yield call ('api', payload) 
    localStorage.setItem('access_token', 'fake_token');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Easy Frontend',
      })
    );

    // redirect to admin page
    yield put(push('/admin/students'));
  } catch (error) {
    yield put(authActions.loginFailed(error.message));
  }
}
function* handleSignUp(payload: SignupPayload) {
  try {
    console.log('vao dayyyyyy')
    yield put(
      authActions.signupSuccess('Dang ky thanh cong')
    );

    // redirect to admin page
    yield put(push('/login'));
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
  // redirect to login page
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const signUpAction: PayloadAction<SignupPayload> = yield take(authActions.signup.type);
    yield fork(handleSignUp, signUpAction.payload);
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const signinAction: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, signinAction.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
