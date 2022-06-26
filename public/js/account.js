export const login = (email, password) => {
    console.log('Begin capture email and password.');
    $.ajax({
        method: 'post',
        url: '/api/v1/account/login/',
        data: {
            email,
            password
        }
    })
        .done(function () {
            console.log('POST: /api/v1/account/login/ | status: success');
            setTimeout(() => {
                window.location.assign('/');
            }, 3000);
        })
        .fail(function (error) {
            console.log('POST: /api/v1/account/login/ | status: error');
            console.log(`Error Received: ${error}`);
            console.dir(error);
            console.table(error);
        })
        .always(function () {
            console.log('POST: /api/v1/account/login/ | status: completed');
        });
};
