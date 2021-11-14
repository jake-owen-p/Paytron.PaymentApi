# Paytron Payment API

## Scripts
To run in dev mode that listens for changes - `npm run dev`

To run tests - `npm run test`

To transpile and run - `npm run start`

## Description
### Controller Validation - src/validation/payment.ts

`POST /payment`
- Checks all required fields exists and are of required type
- If payDate exists, checks it is valid date
- If payDate exists, check is today or in the future
- If payDate exists, checks it is maximum 1 month in the future
- Checks amount is non-negative

`PATCH /payment`
- Checks incoming fields are valid and can be updated

### API Examples
```
POST /payments
{
    "amount": "4",
    "bankInfo": {
        "accountName": "Demo Account",
        "accountNumber": "98765432"
    },
	"beneficiary": {
        "name": "Dataline Demo Account",
        "email": "michael.jones@paytron.com.au"
    },
    "payDate": "2021-11-15",
    "reference": "Expenses November 21",
    "currency": "AUD"
}

SUCCESS RESPONSE
200 
{
  "paymentId": "08ff55e8-0538-483e-aa0a-a43873c0e468"
}

ERROR RESPONSE
403 - negative balance
```
```
PATCH /payments/:paymentId
{
    "reference": "Expenses November 21"
}
```
```
GET /payments

SUCCESS RESPONSE
200
{
  "payments": {
    "72f43bbb-38b8-4663-84a8-783847b4c706": {
      "amount": "4",
      "bankInfo": {
        "accountName": "new name",
        "accountNumber": "98765432"
      },
      "beneficiary": {
        "name": "Dataline Demo Account",
        "email": "michael.jones@paytron.com.au"
      },
      "paymentDate": "2021-11-26",
      "paymentScheduledDate": "2021-11-14",
      "reference": "Expenses November 21",
      "currency": "AUD"
    }
  }
}
```
```
GET /payments/:paymentId

SUCCESS RESPONSE
200
{
      "amount": "4",
      "bankInfo": {
        "accountName": "new name",
        "accountNumber": "98765432"
      },
      "beneficiary": {
        "name": "Dataline Demo Account",
        "email": "michael.jones@paytron.com.au"
      },
      "paymentDate": "2021-11-26",
      "paymentScheduledDate": "2021-11-14",
      "reference": "Expenses November 21",
      "currency": "AUD"
}

ERROR RESPONSE
404 - payment not found
```
```
GET /balance

SUCCESS RESPONSE
200 
{
  balance: 982
}
```

### Future Changes

- Properly typed database
- if amount changes on update, correct the balance
- Covered unit tests, integration and a specfici focus on e2e tests
- better validation message for update payment
