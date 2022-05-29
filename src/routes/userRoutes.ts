// NPM Modules
import express from 'express';

// Custom Modules
import { AuthController, UserController } from './../controllers';

const router = express.Router();

// Open to all users
router.post('/account-register', AuthController.);
router.post('/account-login', AuthController.prototype.login);
router.get('/account-logout', AuthController.prototype.logout);
router.post(
    '/account-password-forgot',
    AuthController.prototype.forgotPassword
);
router.patch(
    '/account-password-reset/:token',
    AuthController.prototype.resetPassword
);
router.use(AuthController.prototype.protectedRoutes);
router.patch(
    '/account-update-profile',
    UserController.prototype.uploadUserPhoto,
    UserController.prototype.updateMyProfile
);
router.patch(
    '/account-update-settings',
    UserController.prototype.updateUserSettings
);
router.delete('/account-deactivate', UserController.prototype.deactivateUser);
router.use(
    AuthController.prototype.restrictToRoles(
        'employee-admin',
        'employee-super-admin'
    )
);
router.route('/').get(UserController. );
router.route('/').post(UserController.prototype.createUser);
router.route('/:id').get(UserController.prototype.getUser);
router.route('/:id').patch(UserController.prototype.updateUser);
router.route('/:id').delete(UserController.prototype.deleteUser);

module.exports = router;
