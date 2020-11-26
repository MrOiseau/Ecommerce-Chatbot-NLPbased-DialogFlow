const mongoose = require('mongoose');
const { Schema } = mongoose;

const demandedPlatformSchema = new Schema({
    platform: String,
    counter: { type: Number, default: 1 }
});

mongoose.model('demanded_platform', demandedPlatformSchema);