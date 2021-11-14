import {DB} from "../../database";
import {getDatesPaymentTakenNow} from "../../utils/date";
import {getNewBalance} from "../../utils/payment";
import {Payment} from "../../types/database";
import {merge} from 'lodash';
import {PAYMENT_NOT_FOUND} from "../../constants/dates";
import dayjs from "dayjs";
import {Logger} from "../../logger";

export const handleSubmitPayment = (payment: Payment) => {
    const datesToTakePaymentNow = getDatesPaymentTakenNow();
    const shouldPaymentBeTaken = !payment.payDate || datesToTakePaymentNow.includes(payment.payDate);

    if (shouldPaymentBeTaken) {
        Logger.log('updating.balance')
        const newBalance = getNewBalance(payment.amount);
        return DB.insert(payment, newBalance);
    }

    return DB.insert(payment);
}

export const handleGetPayments = () => {
    return DB.get('payments');
}

export const handleGetPaymentWithId = (paymentId: string) => {
    const payment = DB.get('payments')[paymentId];
    if (!payment) {
        throw new Error(PAYMENT_NOT_FOUND);
    }
    return payment;
}

export const handleUpdatePayment = (paymentId: string, paymentToUpdate: Partial<Payment>) => {
    const payment = DB.get('payments')[paymentId];
    if (!payment) {
        throw new Error(PAYMENT_NOT_FOUND);
    };
    const updatedPaymentWithDate = {
        ...paymentToUpdate,
        updateAt: dayjs().toISOString()
    };
    const newPayment = merge({}, payment, updatedPaymentWithDate);
    DB.update(`payments.${paymentId}`, newPayment);
}
