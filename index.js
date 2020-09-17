const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const config = require('./config/keys');
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


require('./models/Registration');
require('./models/DemandedProgrammingLanguage');
require('./models/DemandedPlatform');
require('./models/Coupons');

app.use(bodyParser.json());

// Dodam rute u express app... sa (app) omogucim da app bude dostupna u dialogFlowRoutes.js
require('./routes/dialogFlowRoutes')(app); 
require('./routes/fulfillmentRoutes')(app);


// U produkciji JS i CSS opsluzujemo iz client build foldera
// sve rute koje frontend pravi se salju u index.html 
if (process.env.NODE_ENV === 'production') {
    // js and css files
    app.use(express.static('client/build'));

    // index.html for all page routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);