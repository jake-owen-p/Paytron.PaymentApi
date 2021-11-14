import {DB} from "../../src/database";
import {
    handleGetPayments,
    handleGetPaymentWithId,
    handleSubmitPayment,
    handleUpdatePayment
} from "../../src/api/handler/payment";
import dayjs from "dayjs";
import {submitPayment} from '../testUtils';
import {NEGATIVE_BALANCE, PAYMENT_NOT_FOUND} from "../../src/constants/dates";

describe('#handleSubmitPayment', () => {
    beforeEach(() => {
        DB.bootstrap({
            balance: 1000,
            payments: {}
        })
    })
    describe('WHEN payment handler invoked with VALID payment data', () => {
        describe('GIVEN there is no payDay', () => {
            it('THEN it stores payment AND subtracts amount from balance', () => {
                const payment = submitPayment();
                const paymentId = handleSubmitPayment(payment)
                expect(DB.get('balance')).toEqual(996);
                expect(DB.get(`payments.${paymentId}`)).toMatchObject(payment);
            })
        })
        describe('GIVEN there is a payDay AND payDay is today', () => {
            it('THEN it stores payment AND subtracts amount from balance', () => {
                const payment = submitPayment({
                    payDate: dayjs().format('YYYY-MM-DD')
                });
                const paymentId = handleSubmitPayment(payment)
                expect(DB.get('balance')).toEqual(996);
                expect(DB.get(`payments.${paymentId}`)).toMatchObject(payment);
            })
        })
    });
    describe('WHEN payment handler invoked with INVALID payment data', () => {
        describe('GIVEN there is no payDay AND amount takes balance to negative', () => {
            it('THEN throws negative.balance error', () => {
                const payment = submitPayment({
                    amount: 1002
                });
                expect(() => handleSubmitPayment(payment)).toThrow(new Error(NEGATIVE_BALANCE));
            })
        })
    })
})

describe('#handleGetPayments', () => {
    const mockPaymentId = 'mock-payment-id';
    const mockPayment = submitPayment();
    beforeEach(() => {
        DB.bootstrap({
            balance: 1000,
            payments: {
                [mockPaymentId]: mockPayment
            }
        })
    })
    describe('WHEN handle get payments is invoked', () => {
        it('THEN returns all payments in DB', () => {
            const payments = handleGetPayments();
            expect(payments).toEqual({
                [mockPaymentId]: mockPayment
            })
        })
    })
})

describe('#handleGetPayment', () => {
    const mockPaymentId = 'mock-payment-id';
    const mockPayment = submitPayment();
    beforeEach(() => {
        DB.bootstrap({
            balance: 1000,
            payments: {
                [mockPaymentId]: mockPayment
            }
        })
    })
    describe('WHEN handle get payments is invoked with VALID payment id', () => {
        it('THEN returns all payment info', () => {
            const payment = handleGetPaymentWithId(mockPaymentId);
            expect(payment).toEqual(mockPayment)
        })
    })
    describe('WHEN handle get payments is invoked with INVALID payment id', () => {
        it('THEN throws payment.not.found error', () => {
            expect(() => handleGetPaymentWithId('bad-payment-id')).toThrow(PAYMENT_NOT_FOUND)
        })
    })
})

describe('#handleUpdatePayment', () => {
    const mockPaymentId = 'mock-payment-id';
    const mockPayment = submitPayment();
    beforeEach(() => {
        DB.bootstrap({
            balance: 1000,
            payments: {
                [mockPaymentId]: mockPayment
            }
        })
    })
    describe('WHEN handle update payment is invoked with a change to reference', () => {
        it('THEN returns all payment info', () => {
            const newReference = 'new-reference';
            handleUpdatePayment(mockPaymentId, {
                reference: newReference
            });
            const payment = DB.get(`payments.${mockPaymentId}`);
            expect(payment.reference).toEqual(newReference)
        })
    })
})
