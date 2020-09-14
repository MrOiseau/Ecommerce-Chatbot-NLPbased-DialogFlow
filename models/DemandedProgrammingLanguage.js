const mongoose = require('mongoose');
const { Schema } = mongoose;

const demandedProgrammingLanguageSchema = new Schema({
    course: String,
    counter: { type: Number, default: 1 }
});

//Sada kada imamo Schema-u, registrujemo je kao model u Mongoose
mongoose.model('demanded_programming_language', demandedProgrammingLanguageSchema);