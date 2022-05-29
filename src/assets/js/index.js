/* eslint-disable */

console.log('hello from parcel');

import '@babel/polyfill';
import {
    userLogin,
    userLogout,
    updateUserSettings,
    userRegistration,
    userPasswordForgot
} from './users';
import { showAlert } from './alerts';

$(document).ready(function() {
    // DOM Elements
    const loginForm = $('#loginForm');
    const registerForm = $('#registerForm');
    const logOutButton = $('#logoutButton');
    const passwordForgotForm = $('#password-forgot-form');
    const updateMyAccountForm = $('#formUpdateMyAccount');
    const updateUserSettingsForm = $('#formUpdateUserSettings');
    // const userPasswordForm = document.querySelector('.form-user-password');

    // update copyright year automatically
    const today = new Date();
    const year = today.getFullYear();
    $('#copyrightYear').html(year);

    loginForm.submit((event) => {
        event.preventDefault();
        // e.stopImmediatePropagation();
        const email = $('#email').val();
        const password = $('#password').val();
        userLogin(email, password);
    });

    registerForm.submit((event) => {
        console.log('registration form before prevent default');
        event.preventDefault();
        console.log('registration form after prevent default');
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const passwordConfirm = $('#passwordConfirm').val();
        const agencyName = $('#agencyName').val();
        const agreeTerms = $('#agreeTerms').val();

        userRegistration(
            firstName,
            lastName,
            email,
            password,
            passwordConfirm,
            agencyName,
            agreeTerms
        );
    });

    logOutButton.click(userLogout);

    updateMyAccountForm.submit((event) => {
        event.preventDefault();
        const $firstName = $('#firstName').val();
        const $lastName = $('#lastName').val();
        const $emailAddress = $('#emailAddress').val();
        const $phoneNumber = $('#phoneNumber').val();
        const $addressCity = $('#addressCity').val();
        const $addressState = $('#addressState').val();
        const $addressCountry = $('#addressCountry').val();
        const $companyTitle = $('#companyTitle').val();
        const $emailSignature = $('#emailSignature').val();
        const $profileAvatar = document.querySelector('#profileAvatar')
            .files[0];
        const form = new FormData();

        form.append('firstName', $firstName);
        form.append('lastName', $lastName);
        form.append('email', $emailAddress);
        form.append('phone', $phoneNumber);
        form.append('addressCity', $addressCity);
        form.append('addressState', $addressState);
        form.append('addressCountry', $addressCountry);
        form.append('companyTitle', $companyTitle);
        form.append('emailSignature', $emailSignature);

        if ($profileAvatar != undefined) {
            form.append('profileAvatar', $profileAvatar);
        }

        updateUserSettings(form, 'account');
    });

    updateUserSettingsForm.submit((event) => {
        event.preventDefault();
        const $userTimeZone = $('#userSettingsTimeZone option:selected').val();
        const $userTimeFormat = $(
            '#userSettingsTimeFormat option:selected'
        ).val();
        const $userDateFormat = $(
            '#userSettingsDateFormat option:selected'
        ).val();
        const $userNumberFormat = $(
            '#userSettingsNumberFormat option:selected'
        ).val();
        const $userLanguage = $('#userSettingsLanguage option:selected').val();
        const form = new FormData();

        form.append('userSettingsTimeZone', $userTimeZone);
        form.append('userSettingsTimeFormat', $userTimeFormat);
        form.append('userSettingsDateFormat', $userDateFormat);
        form.append('userSettingsNumberFormat', $userNumberFormat);
        form.append('userSettingsLanguage', $userLanguage);

        let reqData = {};
        for (var pair of form.entries()) {
            if (pair[1]) {
                form[pair[0]] = pair[1];
            }
        }

        updateUserSettings(reqData, 'account');
    });
    // if (userPasswordForm)
    //   userPasswordForm.addEventListener('submit', async e => {
    //     e.preventDefault();
    //     document.querySelector('.btn--save-password').textContent = 'Updating...';
    //     const passwordCurrent = document.getElementById('password-current').value;
    //     const password = document.getElementById('password').value;
    //     const passwordConfirm = document.getElementById('password-confirm').value;
    //     await updateSettings(
    //       { passwordCurrent, password, passwordConfirm },
    //       'password'
    //     );
    //     document.getElementById('password-current').value = '';
    //     document.getElementById('password').value = '';
    //     document.getElementById('password-confirm').value = '';
    //     document.querySelector('.btn--save-password').textContent = 'Save Password';
    //   });

    // if (bookButton)
    //   bookButton.addEventListener('click', e => {
    //     e.target.textContent = 'Processing...';
    //     const { tourId } = e.target.dataset;
    //     bookTour(tourId);
    //   });

    passwordForgotForm.submit((event) => {
        event.preventDefault();
        const email = $('#email').val();
        userPasswordForgot(email);
    });

    const alertMessage = document.querySelector('body').dataset.alert;
    if (alertMessage) showAlert('success', alertMessage, 20);

    // Add active classes to sidebar-left nav
    const path = window.location.pathname;
    const navLink = $('.nav > li > a[href="' + path + '"]');
    $(navLink)
        .parent('li')
        .addClass('nav-active');
    $(navLink)
        .parents('li.nav-parent')
        .addClass('nav-expanded nav-active');

    // toggle the main user box
    $('.js-toggle-userMenu').on('click', () => {
        if ($('#userMenu').hasClass('active-modal')) {
            $('#userMenu').removeClass('active-modal');
        } else {
            $('#userMenu').addClass('active-modal');
        }
    });
});
