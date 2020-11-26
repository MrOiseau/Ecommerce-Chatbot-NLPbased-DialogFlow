const mongoose = require('mongoose');
const { Schema } = mongoose;

const demandedProgrammingLanguageSchema = new Schema({
    course: String,
    counter: { type: Number, default: 1 }
});

mongoose.model('demanded_programming_language', demandedProgrammingLanguageSchema);