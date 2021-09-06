const RESPONSE = require("../../constants/response")
require("dotenv").config()
const Payment = require("../models/stripe")
const Order = require("../models/order")

const sKey = process.env.STRIPE_SKEY_LIVE
const endpointSecret = process.env.STRIPE_SECRET

const stripe = require("stripe")(sKey)

const makePayments = async (req, res, next) => {
  const { price, email } = req.body

  console.log("Price =>", price)

  if (!price) {
    return res.status(400).json({ message: "Error: No price field" })
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(price * 100),
    currency: "usd",
    payment_method_types: ["card"],
  })

  const metaData = {
    amount: price,
    email: email,
    meta: JSON.stringify(req.body),
    pi: paymentIntent.id,
  }

  await Payment.create(metaData)

  console.log(paymentIntent.client_secret)
  res.json({
    clientSecret: paymentIntent.client_secret,
    message: "OK:",
  })
}

const verifyPayment = async (req, res) => {
  let event = req.body
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    let signature = req.headers["stripe-signature"]
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      )
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message)
      return res.sendStatus(400)
    }
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentInfo = event.data.object
      console.log(`PaymentIntent for ${paymentInfo.amount} was successful!`)
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      let doc = await Payment.findOneAndUpdate(
        { pi: paymentInfo.payment_intent },
        {
          status: paymentInfo.status,
        },
        {
          new: true,
        }
      )
      // let metas = doc.meta;
      // Create Order
      // if (doc.amount === paymentInfo.amount) {
      //   let metaData = {
      //     amount: doc.amount,
      //     email: metas.emailAddress,
      //     firstname: metas.shFirstName,
      //     lastname: metas.shLastName,
      //     phone: metas.phoneNumber
      //   };

      //   await Order.create(metaData);
      // }
      break
    case "payment_method.attached":
      const paymentMethod = event.data.object
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`)
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send()
}

const makePayment = (req, res, next) => {
  // Moreover, you can take more details from user
  // like Address, Name, etc from form
  stripe.customers
    .create({
      phone: req.body.phoneNumber,
      source: req.body.stripeToken,
      name: req.body.firstName + req.body.lastName,
      address: {
        line1: req.body.address1,
        line2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: req.body.amount,
        description: req.body.description,
        currency: "usd",
        customer: customer.id,
      })
    })
    .then((charge) => {
      res.json({ charge, message: "OK: Succeesfully charged" })
    })
    .catch((error) => {
      res
        .status(RESPONSE.SERVER_INTERNAL_ERROR)
        .json({ message: "Error: Some thing happend", error })
    })
}

module.exports = {
  makePayment,
  makePayments,
  verifyPayment,
}
