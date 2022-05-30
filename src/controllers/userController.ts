// NPM Modules
import multer from 'multer';
import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';
// Custom Modules
import { AppError, CatchAsync, HandlerFactory } from './../utils';
import { User } from './../db/entity';
import { AccountStatus } from './../enums';

// Interfaces
interface CustomRequest extends Request {
    user: User;
    id?: string;
    params: any;
    profileAvatar?: any;
    accountStatus?: string;
}

// Multer Section
// Multer Storage Setup Without Sharp
const multerStorage = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        console.log('req: ' + req);
        console.log('file: ' + file);
        cb(null, 'public/img/users');
    },
    filename: (req: CustomRequest, file, cb) => {
        // Get the file extension
        const ext = file.mimetype.split('/')[1];
        // Combine variables to create new file name
        // new file name: user-userID.extension
        cb(null, `user-${req.user.id}.${ext}`);
    }
});

// Multer Filter Setup
const multerFilter = (req: Request, file: any, cb: any) => {
    console.log('req: ' + req);
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(
            new AppError('Not an image! Please upload only images.', 400),
            false
        );
    }
};
// Apply Multer Storage and Filter to variable
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const uploadUserPhoto = upload.single('profileAvatar');

// Image Middleware
const resizeUserPhoto = CatchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
        console.log('res: ' + res);
        // If there is no file, skip this function
        if (!req.file) return next();
        // Filename isn't defined, so we define it
        req.file.filename = `user-${req.user.id}-${Date.now()}.jpg`;
        // Setup our file manipulation options
        await sharp(req.file.buffer)
            .resize(500, 500)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/users/${req.file.filename}`);

        next();
    }
);

// Filtering Section
const filterObj = (obj: any, ...allowedFields: any) => {
    const newObj: any = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

// Route Handling Section
const getMe = (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log('res: ' + res);
    req.params.id = req.user.id;
    next();
};

const updateMyProfile = CatchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
        // 1. Create error if user POST password data
        if (req.body.password || req.body.passwordConfirm) {
            return next(
                new AppError(
                    'This route is not for password updates. Please use /updateMyPassword.',
                    400
                )
            );
        }
        // 2. Filtered out unwanted field names that are allowed to be updated.
        const filteredBody = filterObj(
            req.body,
            'firstName',
            'lastName',
            'email'
        );
        if (req.file) filteredBody.profileAvatar = req.file.filename;
        // 3. Update the user document
        try {
            // const updatedUser = await User.findByIdAndUpdate(
            //     req.user.id,
            //     filteredBody,
            //     {
            //         new: true,
            //         runValidators: true
            //     }
            // );
            let updatedUser;
            // 4. Send the response with the status and data
            res.status(200).json({
                status: 'success',
                data: {
                    user: updatedUser
                }
            });
        } catch (e) {
            res.status(500).json({
                status: 'error',
                message: 'Error updating User Data'
            });
        }
    }
);

const updateUserSettings = CatchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
        // 1. Filtered out unwanted field names that are allowed to be updated.
        const filteredBody = filterObj(req.body);

        console.log(filteredBody);

        try {
            const updatedUser = await getConnection()
                .createQueryBuilder()
                .update(User)
                .set(filteredBody)
                .where('id = :id', { id: req.user.id })
                .execute();

            // 4. Send the response with the status and data
            res.status(200).json({
                status: 'success',
                data: {
                    user: updatedUser
                }
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Error updating User Setting'
            });
        }
        next();
    }
);

const deactivateUser = CatchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
        // 1. Find user info
        const user: any = await getConnection()
            .createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where('user.id = :id', { id: req.user.id })
            .getOne();

        const status = user.accountStatus;
        // 2. verify user is active

        if (status === AccountStatus.Hold) {
            return next(
                new AppError(
                    'Your account is currently on hold. Please contact us to resolve.',
                    401
                )
            );
        }
        if (status === AccountStatus.Active) {
            // 3. check user's account for bills
            // 4. if all bills are not paid, account status is set to on-hold
            // 5. if all bills are paid, account status is set to inactive
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({
                    accountStatus: () => AccountStatus.prototype.Inactive,
                    isActiveAccount: false
                })
                .where('id = :id', { id: req.user.id })
                .execute();

            // 7. send notice to user via email
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            // email module broken, pending mailtrap support
            // await new Email(user, '').sendWelcome();

            // 8. send response to the browser
            res.status(200).json({
                status: 'success',
                message: 'Account was successfully deactivated.'
            });
        }
    }
);

const createUser = (req: Request, res: Response) => {
    console.log('req: ' + req);
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined! Please use /signup instead'
    });
};

const getAllUsers = () => {
    HandlerFactory.prototype.readAll(User);
};
const getUser = () => {
    HandlerFactory.prototype.readOne(User);
};
// Update User doesn't update passwords
const updateUser = () => {
    HandlerFactory.prototype.updateOne(User);
};
const deleteUser = () => {
    HandlerFactory.prototype.deleteOne(User);
};

export default {
    createUser,
    deactivateUser,
    deleteUser,
    getAllUsers,
    getMe,
    getUser,
    resizeUserPhoto,
    updateMyProfile,
    updateUser,
    uploadUserPhoto,
    updateUserSettings
};
