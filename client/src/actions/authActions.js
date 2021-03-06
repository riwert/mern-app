import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

import { returnErrors } from './errorActions';

export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    await axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

export const register = ({ name, email, password }) => async dispatch => {
    const config = jsonConfig();

    const body = JSON.stringify({ name, email, password });

    await axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

export const login = ({ email, password }) => async dispatch => {
    const config = jsonConfig();

    const body = JSON.stringify({ email, password });

    await axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = jsonConfig();

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}

export const jsonConfig = () => {
    return {
        headers: {
            "Content-Type": "application/json"
        }
    }
}
