import validator, { body, checkSchema } from 'express-validator';
import dayjs from "dayjs";
import {objectDeepKeys} from "../../utils/objects";

const isRequiredMessage = (field: string, type?: string) => `${field} is required${type ? ` and be of type ${type}` : ''}`;
const getTypeValidation: Record<string, validator.ParamSchema> = {
    'string': {isString: true},
    'number': {isInt: true},
}
const existsInBody = (field: string, type?: string): validator.ParamSchema => {
    const typeValidation = type ? getTypeValidation[type] : {};
    return {
        in: ['body'],
        errorMessage: isRequiredMessage(field, type),
        notEmpty: true,
        ...typeValidation,
    }
}

export const validateRequestSchema = checkSchema({
    amount: existsInBody('amount', 'number'),
    'bankInfo.accountName': existsInBody('account name', 'string'),
    'bankInfo.accountNumber': existsInBody('account number', 'string'),
    'beneficiary.name': existsInBody('beneficiary name', 'string'),
    'beneficiary.email': existsInBody('beneficiary email', 'string'),
    reference: existsInBody('reference', 'string'),
    currency: existsInBody('currency', 'string'),
})

export const validatePaymentAmount =
    body('amount')
        .isNumeric().withMessage('must be a number')
        .isInt({ min: 0 }).withMessage('must be greater then 0');

const validateDateIsTodayOrFuture = (value: string) => dayjs().diff(value, 'day') <= 0;
const validateDateIsWithinOneMonth = (value: string) => dayjs().diff(value, 'month') > -1;

export const validatePaymentDate =
    body('payDate')
        .optional()
        .isDate({format: 'YYYY-MM-DD'}).withMessage('must be a date')
        .custom(validateDateIsTodayOrFuture).withMessage('must be today or in the future')
        .custom(validateDateIsWithinOneMonth).withMessage('must be within 1 month')

const validKeysToUpdate = [
    'amount',
    'bankInfo',
    'bankInfo.accountName',
    'bankInfo.accountNumber',
    'beneficiary',
    'beneficiary.name',
    'beneficiary.email',
    'payDate',
    'reference',
    'currency',
]
export const validateUpdatePaymentRequest =
    body()
        .custom(body => {
            const incomingKeys = objectDeepKeys(body);
            const invalidKeys = incomingKeys.some((key: string) => !validKeysToUpdate.includes(key));
            return !invalidKeys;
        }).withMessage('invalid keys provided')
