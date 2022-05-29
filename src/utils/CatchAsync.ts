import { Request, Response, NextFunction } from 'express';

exports.CatchAsync = function(fn: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

export default module.exports;
