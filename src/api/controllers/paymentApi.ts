import express, {Express} from "express";
import {Logger} from "../../logger";
import {SubmitPaymentRequest, UpdatePaymentRequest} from "../../types/api/payment";
import {checkValidationErrors} from "../middleware/validation";
import {
    validatePaymentAmount,
    validatePaymentDate,
    validateRequestSchema, validateUpdatePaymentRequest,
} from "../validation/payment";
import {handleGetPayments, handleGetPaymentWithId, handleSubmitPayment, handleUpdatePayment} from "../handler/payment";

export const submitPayment = (app: Express) => app.post(
    "/payments",
    validateRequestSchema,
    validatePaymentAmount,
    validatePaymentDate,
    checkValidationErrors,
    ( req: SubmitPaymentRequest, res: express.Response ) => {
        Logger.log('request.started');
        const paymentId = handleSubmitPayment(req.body);
        Logger.log('request.complete');
        res.status( 201 ).send({ paymentId });
})

export const getPayments = (app: Express) => app.get(
    "/payments",
    ( _: express.Request, res: express.Response ) => {
            Logger.log('request.started');
            const payments = handleGetPayments();
            Logger.log('request.complete');
            res.status( 200 ).send({ payments });
    })

export const getPayment = (app: Express) => app.get(
    "/payments/:paymentId",
    ( req: express.Request, res: express.Response ) => {
            Logger.log('request.started', { paymentId: req.params.paymentId });
            const payment = handleGetPaymentWithId(req.params.paymentId);
            Logger.log('request.complete', { paymentId: req.params.paymentId });
            res.status( 200 ).send(payment);
    })

export const updatePayment = (app: Express) => app.patch(
    "/payments/:paymentId",
    validateUpdatePaymentRequest,
    checkValidationErrors,
    ( req: UpdatePaymentRequest, res: express.Response ) => {
            Logger.log('request.started', { paymentId: req.params.paymentId });
            handleUpdatePayment(req.params.paymentId, req.body);
            Logger.log('request.complete', { paymentId: req.params.paymentId });
            res.status( 204 ).send();
    })
