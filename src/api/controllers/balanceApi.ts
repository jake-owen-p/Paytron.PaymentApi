import express, {Express} from "express";
import {checkValidationErrors} from "../middleware/validation";
import {Logger} from "../../logger";
import {handleGetBalance} from "../handler/balance";

export const getBalance = (app: Express) => app.get(
    "/balance",
    checkValidationErrors,
    ( _: express.Request, res: express.Response ) => {
        Logger.log('request.started');
        const balance = handleGetBalance();
        Logger.log('request.complete');
        res.status( 200 ).send({ balance });
    })
