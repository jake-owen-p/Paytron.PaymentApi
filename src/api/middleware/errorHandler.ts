import express from "express";
import {ApiError} from "../../types/error";
import {Logger} from "../../logger";
import {NEGATIVE_BALANCE, PAYMENT_NOT_FOUND} from "../../constants/dates";

const errors: Record<string, ApiError> = {
    [NEGATIVE_BALANCE]: {
        status: 403,
        message: 'Payment brings balance to negative'
    },
    [PAYMENT_NOT_FOUND]: {
        status: 404,
        message: 'Could not find payment for provided payment id'
    }
}
export function errorHandler (err: Error, _: express.Request, res: express.Response, next: express.NextFunction) {
    const error = errors[err.message];
    const status = error?.status || 500;
    const message = error?.message || 'There was an error';
    if (err) {
        Logger.error(err);
        return res.status(status).send({ message });
    }
    next();
}
