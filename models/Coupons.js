const mongoose = require('mongoose');
const { Schema } = mongoose;

const couponsSchema = new Schema({
    programming_language: Array,
    chatbot_platform: Array,
    link: String
});

mongoose.model('coupon', couponsSchema);