import { login } from './account';

$(document).ready(function () {
    // DOM Elements
    const loginForm = $('#loginForm');

    loginForm.submit((event) => {
        event.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        login(email, password);
    });
});
