// Core Modules
import crypto from 'crypto';

// NPM Modules
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { getConnection, MoreThan } from 'typeorm';

// Custom Modules
import { User } from './../db/entity';
import { AppError, CatchAsync } from './../utils';

export class CustomRequest {
    user?: any;
    headers: any;
    cookies?: any;
}
function signToken(id: any) {
    return jwt.sign({ id }, process.env.JWT_SECRET as Secret, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

function createSendToken(
    user: User,
    statusCode: number,
    req: Request,
    res: Response
) {
    // capture the token
    const token = signToken(user.id.toString());
    // establish all cookie options for all environments
    // send the cookie to the browser
    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() +
                Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure // || req.headers('x-forwarded-proto') === 'https'
    });
    // remove the password from the JSON output
    user.password = '';
    // send the response and data
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
}

const forgotPassword = CatchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        // 1. Get user based on POST email
        const user = await getConnection()
            .createQueryBuilder()
            .select('user', 'id')
            .from(User, 'user')
            .where('user.email = email', { email: req.body.email })
            .getOne();

        if (!user) {
            return next(
                new AppError('There is no user with that email address.', 404)
            );
        }

        // 2. Generate random token
        const resetToken = user.createPasswordResetToken();
        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ passwordResetToken: resetToken })
            .where('id = :id', { id: user.id })
            .execute();

        // 3. Send it to user's email
        try {
            // const resetURL = `${req.protocol}://${req.get(
            //     'host'
            // )}/api/v1/users/password-reset/${resetToken}`;

            // email util is broken, pending mailtrap support
            // await new Email(user, resetURL).sendPasswordReset();

            res.status(200).json({
                status: 'success',
                message: 'Password reset token sent to email specified.'
            });
        } catch (err) {
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({
                    passwordResetToken: undefined,
                    passwordResetExpires: undefined
                })
                .where('id = :id', { id: user.id })
                .execute();

            return next(
                new AppError(
                    'There was an error sending the email. Please try again later.',
                    500
                )
            );
        }
    }
);

const isLoggedIn = CatchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        if (req.cookies.jwt) {
            try {
                // 1. Verification of the token
                const decoded: any = jwt.verify(
                    req.cookies.jwt,
                    process.env.JWT_SECRET as Secret
                );

                // 2. Check if the user still exists
                const currentUser = await getConnection()
                    .createQueryBuilder()
                    .select('user')
                    .from(User, 'user')
                    .where('user.id = :id', { id: decoded.id })
                    .getOne();

                if (!currentUser) {
                    return next();
                }
                // 3. Check if the user changed the password after the token was issued
                if (currentUser.changedPasswordAfter(decoded.iat)) {
                    return next();
                }
                // 4. Grant access to protected routes
                res.locals.user = currentUser;
                return next();
            } catch (err) {
                return next();
            }
        } else {
            res.redirect('/login');
        }
        next();
    }
);

const login = CatchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        // 1. Check if the email and password exists
        if (!email || !password) {
            return next(
                new AppError('Please provide email and password.', 400)
            );
        }
        // 2. Check if user exists and if password is correct
        const user: any = await getConnection()
            .createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where('user.email = email', { email: email })
            .getOne();

        const isPasswordValid = await user.correctPassword(
            password,
            user.password
        );

        if (!user || !isPasswordValid) {
            return next(new AppError('Incorrect email or password.', 401));
        }
        // 3. If all is ok, send a token to the client.
        createSendToken(user, 200, req, res);
        if (process.env.NODE_ENV === 'development') {
            console.log(email);
            console.log(password);
        }
    }
);

const logout = (req: Request, res: Response) => {
    console.log(req);
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};

const protectedRoutes = CatchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
        // 1. Getting the token and check if it exists
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            return next(
                new AppError(
                    'You are not logged in. Please login to access this page.',
                    401
                )
            );
        }

        // 2. Verification of the token
        const decoded: any = await jwt.verify(
            token,
            process.env.JWT_SECRET as Secret
        );

        // 3. Check if the user still exists
        const currentUser = await getConnection()
            .createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where('user.id = :id', { id: decoded.id })
            .getOne();

        if (!currentUser) {
            return next(
                new AppError('The user for this token no longer exists', 401)
            );
        }
        // 4. Check if the user changed the password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            // If password was changed, throw error
            return next(
                new AppError(
                    'User recently changed password. Please login again.',
                    401
                )
            );
        }
        // 5. Otherwise, Grant access to protected routes
        req.user = currentUser;
        res.locals.user = currentUser;
        next();
    }
);

const register = CatchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await getConnection()
            .createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where('user.email = email', { email: req.body.email })
            .getOne();

        if (user) {
            res.status(401).json({
                status: 'error',
                message: 'Users Already Registered With this Email.'
            });
            // return next(new AppError('Users Already Registered With this Email.'), 401);
        }
        const newUser: any = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    passwordConfirm: req.body.passwordConfirm,
                    passwordChangedAt: new Date(),
                    userRole: req.body.userRole
                }
            ])
            .execute();

        // const urlDomain = `${req.protocol}://${req.get('host')}/my-account`;
        // email util is broken, pending mailtrap support
        // await new Email(newUser, urlDomain).sendWelcome();
        createSendToken(newUser, 201, req, res);
        console.log(newUser);
        next();
    }
);

const resetPassword = CatchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        // 1. Get user based on the token
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await getConnection()
            .createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where('user.passwordResetToken = passwordResetToken', {
                passwordResetToken: hashedToken,
                passwordResetExpires: MoreThan(Date.now())
            })
            .getOne();

        // 2. If token not expired, and there is a user, set the new password
        if (!user) {
            return next(new AppError('Token is invalid or has expired', 400));
        }

        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm,
                passwordResetToken: undefined,
                passwordResetExpires: undefined
            })
            .where('user.id = :id', { id: user.id })
            .execute();

        // 3. Update passwordChangedAt property for the user
        // 4. Log the user in and send JWT
        createSendToken(user, 200, req, res);
    }
);

const restrictToRoles = (...roles: string[]) => {
    // Give access to Roles ['admin', 'lead-guide']
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        console.log(res);
        // If role != 'admin', or 'lead-guide', deny access
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    'You do not authorized to perform this action.',
                    403
                )
            );
        }
        next();
    };
};

exports.updatePassword = CatchAsync(
    async (req: CustomRequest | any, res: Response, next: NextFunction) => {
        // 1. Get the user from the collection
        const user: any = await getConnection()
            .createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where('user.id = :id', { id: req.user.id })
            .getOne();

        // 2. Check if the POST password is correct
        if (
            !(await user.correctPassword(
                req.body.passwordCurrent,
                user.password
            ))
        ) {
            return next(new AppError('Your current password is wrong.', 401));
        }
        // 3. If correct, update the password and passwordConfirm
        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm
            })
            .where('id = :id', { id: req.user.id })
            .execute();

        // 4. Log the user in, send JWT
        createSendToken(user, 200, req, res);
    }
);

module.exports = exports.AuthController;
