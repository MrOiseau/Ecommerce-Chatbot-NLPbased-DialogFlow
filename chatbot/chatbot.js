'use strict';
const dialogflow = require('dialogflow');
const { struct } = require('pb-util');
const config = require('../config/keys');
const mongoose = require('mongoose');

/**
 * Send a query to the dialogflow agent, and return the query result.
 */
const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey,
};


// Create a new session
const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });
//const sessionPath = sessionClient.sessionPath(projectId, sessionId);
const Registration = mongoose.model('registration');     //I nacin arhitekture

module.exports = {
    textQuery: async function (text, userID, parameters = {}) {
        // Da bismo mogli da pristupimo drugoj module.exports metodi (npr. handleAction())
        let self = module.exports;
        const sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: text,
                    // The language used by the client (en-US)
                    languageCode: languageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        // Send request and log result
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },
    eventQuery: async function (event, userID, parameters = {}) {
        let self = module.exports;
        let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    //parameters: structjson.jsonToStructProto(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
                    parameters: struct.encode(parameters), //Dialogflow's v2 API uses gRPC - convert JavaScript object to a proto struct.
                    languageCode: languageCode,
                },
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;

    },


    handleAction: function (responses) {
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'recommendbooks-yes':
                if (queryResult.allRequiredParamsPresent) {
                    //citam parametre iz parameters.field koje posle cuvam u bazu 
                    self.saveRegistration(queryResult.parameters.fields);
                }
                break;
        }
    //Ovako bih citao sve info koje mi trebaju, ali kako app bude rasla, 
    // hvatacu vise od 1 action ovde, pa sam napravio switch
        // console.log(queryResult.action);
        // console.log(queryResult.allRequiredParamsPresent);
        // console.log(queryResult.fulfillmentMessages);
        // console.log(queryResult.parameters.fields);

        return responses;
    },

    saveRegistration: async function (fields) {
        const registration = new Registration({
            name: fields.name.stringValue,
            address: fields.address.stringValue,
            phone: fields.phone.stringValue,
            email: fields.email.stringValue,
            registerDate: Date.now()
        });
        try {
            let reg = await registration.save();
            console.log(reg);       //da vidim u konzoli sta cuva u MongoDB
        } catch (err) {
            console.log(err);
        }
    }
}