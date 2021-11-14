import express from "express";
import {Payment} from "../database";

export interface SubmitPaymentRequest extends express.Request {
    body: Payment
}

export interface UpdatePaymentRequest extends express.Request {
    body: Partial<Payment>
}
