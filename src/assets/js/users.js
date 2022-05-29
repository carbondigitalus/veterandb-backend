/* eslint-env browser, es6 */

import axios from 'axios';
import { showAlert } from './alerts';
import app from '../../app';

export const userLogin = async (email, password) => {
    try {
        console.log('Begin capture email and password.');
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login/',
            data: {
                email,
                password
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 3000);
        } else {
            showAlert('error', res.data.message);
        }
    } catch (err) {
        showAlert('error', 'Failed to login');
        console.log(`Error Received: ${err}`);
    }
};

export const userRegistration = async (
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    agencyName
) => {
    console.log('Register: Start');
    console.log('Register: firstName = ' + firstName);
    console.log('Register: lastName = ' + lastName);
    console.log('Register: email = ' + email);
    console.log('Register: password = ' + password);
    console.log('Register: passwordConfirm = ' + passwordConfirm);
    console.log('Register: agencyName = ' + agencyName);

    try {
        const res = await axios({
            method: 'post',
            url: '/api/v1/users/register',
            data: {
                firstName,
                lastName,
                email,
                password,
                passwordConfirm,
                agencyName
            }
        });

        if (res.data.status === 'success') {
            console.log('Register: Success');
            showAlert('success', 'Registration completed successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 100);
        }
    } catch (err) {
        console.log('Register: Error');
        console.log(`Error Received: ${err}`);
        showAlert('error', err.response.data.message);
    }
};

export const userLogout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout'
        });
        if (res.data.status === 'success') location.assign('/login');
    } catch (err) {
        showAlert('error', 'Error logging out. Please try again.');
        console.log(`Error Received: ${err}`);
    }
};

export const updateUserSettings = async (data, type) => {
    try {
        let url;
        if (type === 'password') {
            url = '/api/v1/users/updateMyPassword';
        } else if (type === 'account') {
            url = '/api/v1/users/updateMyProfile';
        } else if (type == 'settings') {
            url = '/api/v1/users/updateUserSettings';
        }

        const res = await axios({
            method: 'patch',
            url,
            data: data
        });

        if (res.data.status === 'success') {
            showAlert('success', `${type.toUpperCase()} updated successfully!`);
            window.setTimeout(() => {
                location.assign('/my-account');
            }, 100);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
        console.log(`Error Received: ${err}`);
    }
};

export const userPasswordForgot = async (email) => {
    console.log('Forgot Password: Start');
    $.ajax({
        method: 'post',
        url: '/api/v1/users/forgot-password/',
        data: {
            email
        }
    })
        .done(() => {
            console.log('Forgot Password: Success');
        })
        .fail(() => {
            console.log('Forgot Password: Error');
            console.log(`Error Received: ${err}`);
            showAlert('error', data.message);
        })
        .always(() => {
            console.log('Forgot Password: Done');
        });
};
