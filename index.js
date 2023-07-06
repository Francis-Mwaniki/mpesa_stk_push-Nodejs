const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const port=process.env.PORT || 3000

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const getAccessToken = async() => {

    const consumerKey = 'your consumer key'
    const consumerSecret = "your consumer secret"

    //choose one depending on you development environment
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"  //sandbox
  //  const url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",  //live
    
  try {
   
    const encodedCredentials = new Buffer.from(consumerKey + ":" + consumerSecret).toString('base64');

    // const headers = {
    //   'Authorization': "Basic" + " " + encodedCredentials',
    //   'Content-Type': 'application/json'
    // }; 
    const headers = {
        'Authorization': "Basic" + " " + encodedCredentials,
        'Content-Type': 'application/json'
      };


    const response = await axios.get(url, { headers });
    console.log('...............response............');
    console.log(response.data);
    return response.data.access_token;
  } catch (error) {
    
    throw new Error('Failed to get access token.');
  }
}


async function sendStkPush() {
  const token = await getAccessToken();
  const date = new Date();
  const timestamp =
  date.getFullYear() +
  ("0" + (date.getMonth() + 1)).slice(-2) +
  ("0" + date.getDate()).slice(-2) +
  ("0" + date.getHours()).slice(-2) +
  ("0" + date.getMinutes()).slice(-2) +
  ("0" + date.getSeconds()).slice(-2);

  //you can use momentjs to generate the same in one line 

  const shortCode = "174379"; //sandbox -174379
  const passkey = "your passkey";
  

  const stk_password = new Buffer.from(shortCode + passkey + timestamp).toString(
        "base64"
      );

  //choose one depending on you development environment
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
  //const url = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",

  const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  };

  const requestBody = {
    "BusinessShortCode": shortCode,
    "Password": stk_password,
    "Timestamp": timestamp,
    "TransactionType": "CustomerPayBillOnline", //till "CustomerBuyGoodsOnline"
    "Amount": "1",
    "PartyA": "254708374149",
    "PartyB": shortCode,
    "PhoneNumber": "254708374149",
    "CallBackURL": "https://52a0-102-68-79-143.ap.ngrok.io/callbackurl",
    "AccountReference": "account",
    "TransactionDesc": "test"
  };

  try {
    const response = await axios.post(url, requestBody, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}



app.post('/stkpush', async (req, res) => {
  try {
    const response = await sendStkPush();
    res.send(response);
  } catch (error) {
    console.error(error);
  }
})

app.post('/callbackurl', (req, res) => {
  console.log('...............callbackurl............')
  console.log(req.body);
  res.send('ok');
})

app.listen(3000, () => {
  console.log(` app listening at http://localhost:${port}`);
});