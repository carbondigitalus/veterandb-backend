import { login, logout, register } from './account';

$(document).ready(function () {
    // DOM Elements
    const loginForm = $('#loginForm');
    const logoutButton = $('#logoutButton');
    const registerForm = $('#registerForm');

    loginForm.on('submit', (event) => {
        event.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        login(email, password);
    });

    logoutButton.on('click', (event) => {
        event.preventDefault();
        logout();
    });

    registerForm.on('submit', (event) => {
        event.preventDefault();
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const passwordConfirm = $('#passwordConfirm').val();
        register(firstName, lastName, email, password, passwordConfirm);
    });
});
