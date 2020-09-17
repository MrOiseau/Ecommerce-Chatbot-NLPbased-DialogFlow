'use strict';

const chatbot = require('../chatbot/chatbot');

/*
Api endpoint for backend - making call to DF
*/ 

// module = var. koja predstavlja trenutni modul. Exports je obj. koji se prikauje kao module. U taj fajl prosledim app
// Ekspose obj.u module fajl prosledjujem express app. Pomocu arrow f-je transf. app var.
module.exports = app => {

    // app.get('/', (req, res) => {
    //     res.send({'zdravo': 'Dzoniii'})
    //  });

    app.post('/api/df_text_query', async (req, res) => {
        //res.send({'do': 'text query'})
        let responses = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters);
        res.send(responses[0].queryResult);
    });

    app.post('/api/df_event_query', async (req, res) => {
        //res.send({'do': 'event query'})
        let responses = await chatbot.eventQuery(req.body.event, req.body.userID, req.body.parameters);
        res.send(responses[0].queryResult);
    });
} 