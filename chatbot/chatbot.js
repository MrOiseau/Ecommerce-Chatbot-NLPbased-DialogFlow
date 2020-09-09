'use strict';
const dialogflow = require('dialogflow');
const protobuf = require("protobufjs/light");
//const uuid = require('uuid');
//const sessionId = uuid.v4();
const config = require('../config/keys');

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
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

module.exports = {
    textQuery: async function (text, parameters = {}) {
        let self = module.exports;
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
    eventQuery: async function (event, parameters = {}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    //parameters: structjson.jsonToStructProto(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
                    parameters: protobuf.encoder(parameters), //Dialogflow's v2 API uses gRPC - convert your JavaScript object to a proto struct.
                    languageCode: languageCode,
                },
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;

    },


    handleAction: function (responses) {
        return responses;
    },


}