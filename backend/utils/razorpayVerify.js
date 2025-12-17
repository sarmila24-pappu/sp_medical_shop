const crypto = require('crypto');
module.exports = function verifyRazorpaySignature(order_id, payment_id, signature, key_secret){
const body = order_id + '|' + payment_id;
const expectedSignature = crypto.createHmac('sha256', key_secret).update(body).digest('hex');
return expectedSignature === signature;
}