
// In file: netlify/functions/create-razorpay-order.js
const axios = require('axios');

exports.handler = async function(event, context) {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

  const orderOptions = {
    amount: 30000, // 30000 paise = ₹300
    currency: 'INR',
    receipt: `receipt_order_${new Date().getTime()}`,
  };

  try {
    const response = await axios.post('https://api.razorpay.com/v1/orders', orderOptions, {
      auth: {
        username: RAZORPAY_KEY_ID,
        password: RAZORPAY_KEY_SECRET
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create Razorpay order.' })
    };
  }
};
