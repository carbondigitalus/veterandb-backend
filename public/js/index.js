import { login, register } from './account';

$(document).ready(function () {
    // DOM Elements
    const loginForm = $('#loginForm');
    const registerForm = $('#registerForm');

    loginForm.submit((event) => {
        event.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        login(email, password);
    });

    registerForm.submit((event) => {
        event.preventDefault();
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const passwordConfirm = $('#passwordConfirm').val();
        register(firstName, lastName, email, password, passwordConfirm);
    });
});
