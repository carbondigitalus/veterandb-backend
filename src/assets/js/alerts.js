/* eslint-disable */

export const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};

// Type = 'success' || 'error'
export const showAlert = (type, message, time) => {
    if (type === 'success') {
        $(function() {
            new PNotify({
                title: 'Success',
                text: `${message}`,
                type: 'success',
                addclass: 'notification-success',
                icon: 'fas fa-home'
            });
        });
    } else if (type === 'error') {
        $(function() {
            new PNotify({
                title: 'Error',
                text: `${message}`,
                type: 'error',
                addclass: 'notification-error',
                icon: 'fas fa-times'
            });
        });
    }

    // hideAlert();
    // const markup = `<div class="alert alert--${type}">${message}</div>`;
    //
    // document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    // window.setTimeout(hideAlert, time * 1000);
};
