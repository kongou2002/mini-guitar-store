const paypal = require('@paypal/checkout-server-sdk')
require('dotenv').config()

let clientID = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
let environment = new paypal.core.SandboxEnvironment(clientID, clientSecret)
let client = new paypal.core.PayPalHttpClient(environment)


module.exports = {
    client
}