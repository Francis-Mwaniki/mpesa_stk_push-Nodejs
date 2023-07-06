### what you need to have 

- [x] consumer key
- [x] consumer secret
- [x] passkey

### how to get them

 - [x] consumer key and consumer secret
    - [x] go to [developer portal](https://developer.safaricom.co.ke/user/me/apps)
    - [x] create an app
    - [x] get consumer key and consumer secret

    - [x] passkey
    - [x] go to [developer portal](https://developer.safaricom.co.ke/user/me/apps)
    - [x] click on the api you want to use select Mpesa Express Sandbox

### how to use
- [x] clone the repo
    - [x] cd into the repo
    - [x] run `npm install`
    - [x] run `npm start`
    - [x] open your favourite testing tool and make a post request to `http://localhost:3000/api/v1/mpesa/stk/push`
    - [x] pass the following in the body of the request if you wanna post to sandbox or you can use my function to push an stk push
    - [x] `{
                "BusinessShortCode": "174379",
                "Password": "Mpesa2019",
                "Timestamp": "20190127101010",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": "1",
                "PartyA": "254708374149",
                "PartyB": "174379",
                "PhoneNumber": "254708374149",
                "CallBackURL": "https://fullstackdevelopers.slack.com/",
                "AccountReference": "test",
                "TransactionDesc": "test"
            }`
- [x] you should get a response like this
        - [x] `{
                "MerchantRequestID": "12345-54321-2",
                "CheckoutRequestID": "ws_CO_27120190101010101",
                "ResponseCode": "0",
                "ResponseDescription": "Success. Request accepted for processing",
                "CustomerMessage": "Success. Request accepted for processing"
            }`
 - [x] you should get a confirmation message on your phone

