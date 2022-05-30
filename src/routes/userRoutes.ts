// NPM Modules
import express from 'express';

// Custom Modules
// import { AuthController, UserController } from './../controllers';
import AuthController from '../controllers/authController';
import UserController from '../controllers/userController';

const router = express.Router();

// Open to all users
router.use(AuthController.prototype.protectedRoutes);
router.post('/account-register', AuthController.register);
router.post('/account-login', AuthController.login);
router.get('/account-logout', AuthController.logout);
router.post('/account-password-forgot', AuthController.forgotPassword);
router.patch('/account-password-reset/:token', AuthController.resetPassword);
router.patch(
    '/account-update-profile',
    UserController.uploadUserPhoto,
    UserController.updateMyProfile
);
router.patch(
    '/account-update-settings',
    UserController.prototype.updateUserSettings
router.delete(
    '/account-deactivate',
    AuthController.protectedRoutes,
    UserController.deactivateUser
);
router.use(
    AuthController.restrictToRoles('employee-admin', 'employee-super-admin')
);
router
    .route('/')
    .get(AuthController.protectedRoutes, UserController.getAllUsers);
router
    .route('/')
    .post(AuthController.protectedRoutes, UserController.createUser);
router
    .route('/:id')
    .get(AuthController.protectedRoutes, UserController.getUser);
router
    .route('/:id')
    .patch(AuthController.protectedRoutes, UserController.updateUser);
router
    .route('/:id')
    .delete(AuthController.protectedRoutes, UserController.deleteUser);

export default router;
