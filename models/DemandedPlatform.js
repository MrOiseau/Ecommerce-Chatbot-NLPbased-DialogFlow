const mongoose = require('mongoose');
const { Schema } = mongoose;

const demandedPlatformSchema = new Schema({
    platform: String,
    counter: { type: Number, default: 1 }
});

//Sada kada imamo Schema-u, registrujemo je kao model u Mongoose
mongoose.model('demanded_platform', demandedPlatformSchema);