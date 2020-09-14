const mongoose = require('mongoose');   //get mongoose library
const { Schema } = mongoose;            //get Schema class iz mongoose

const registrationSchema = new Schema({     //prosledjujem objekat sa property imenima i njihovim Schema tipovima
    name: String,
    address: String,
    phone: String,
    email: String,
    registerDate: Date
});

mongoose.model('registration', registrationSchema);     //jer Schema-u trebam registrovati kao model