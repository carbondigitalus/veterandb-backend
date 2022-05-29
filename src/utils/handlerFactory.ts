// NPM Modules
import { Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';

// Custom Modules
import { AppError } from './index';
const catchAsync = require('./catchAsync');

export class HandlerFactory {
    constructor() {}

    createOne = (Entity: any) =>
        catchAsync(async (req: Request, res: Response, next: NextFunction) => {
            const dbRecord = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Entity)
                .values(req.body)
                .execute();

            res.status(201).json({
                status: 'success',
                data: {
                    data: dbRecord
                }
            });
            next();
        });

    readOne = (Entity: any) =>
        catchAsync(async (req: Request, res: Response, next: NextFunction) => {
            const dbRecord = await getConnection()
                .createQueryBuilder()
                .select()
                .from(Entity, `${Entity}`)
                .where(`${Entity}.id = :id`, { id: req.params.id })
                .getOne();

            if (!dbRecord) {
                return next(
                    new AppError('No document found with that ID.', 404)
                );
            }

            res.status(200).json({
                status: 'success',
                data: {
                    data: dbRecord
                }
            });
        });

    readAll = (Entity: any) =>
        catchAsync(async (req: Request, res: Response, next: NextFunction) => {
            const dbRecord = await getConnection()
                .createQueryBuilder()
                .select()
                .from(Entity, `${Entity}`)
                .where(`${Entity}.id = :id`, { id: req.params.id })
                .getMany();

            // Send Response
            res.status(200).json({
                status: 'success',
                results: dbRecord.length,
                data: {
                    data: dbRecord
                }
            });
            next();
        });
    updateOne = (Entity: any) =>
        catchAsync(async (req: Request, res: Response, next: NextFunction) => {
            const dbRecord = await getConnection()
                .createQueryBuilder()
                .update(Entity)
                .set(req.body)
                .where('id = :id', { id: req.params.id })
                .execute();

            if (!dbRecord) {
                return next(
                    new AppError('No document found with that ID.', 404)
                );
            }

            res.status(200).json({
                status: 'success',
                data: {
                    data: dbRecord
                }
            });
        });
    deleteOne = (Entity: any) =>
        catchAsync(async (req: Request, res: Response, next: NextFunction) => {
            const dbRecord = await getConnection()
                .createQueryBuilder()
                .delete()
                .from(Entity)
                .where('id = :id', { id: req.params.id })
                .execute();

            if (!dbRecord) {
                return next(new AppError('No tour found with that ID.', 404));
            }

            res.status(204).json({
                status: 'success',
                data: null
            });
        });
}
