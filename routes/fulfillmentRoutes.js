const { WebhookClient } = require('dialogflow-fulfillment');

const mongoose = require('mongoose');
const DemandedProgrammingLanguage = mongoose.model('demanded_programming_language');
const DemandedPlatform = mongoose.model('demanded_platform');
const Coupon = mongoose.model('coupon');


module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        function snoopy(agent) {
            agent.add(`Dobrodošo u Snupi fulfillment!`);
        }


        async function learn(agent) {
            
            DemandedProgrammingLanguage.findOne({ 'course': agent.parameters.chatbot_jezik }, function (err, course) {
                if (course !== null) {
                    course.counter++;
                    course.save();
                } else {                   
                    const demanded_programming_language = new DemandedProgrammingLanguage({ course: agent.parameters.chatbot_jezik });
                    demanded_programming_language.save();
                }
            });

            DemandedPlatform.findOne({ 'platform': agent.parameters.chatbot_platforma }, function (err, platform) {
                if (platform !== null) {
                    platform.counter++;
                    platform.save();
                } else {                    
                    const demanded_platform = new DemandedPlatform({ platform: agent.parameters.chatbot_platforma });
                    demanded_platform.save();
                }
            });

            try {

                const coupons = await Coupon.find({
                    "$or": [{ 'programming_language': agent.parameters.chatbot_jezik }, { 'chatbot_platform': agent.parameters.chatbot_platforma }],
                });

                // Only programming language selected
                const arrayOfObjMatchedProgLang = await coupons.filter(function (k) {
                    if (agent.parameters.chatbot_jezik !== "")
                        return k.programming_language.includes(agent.parameters.chatbot_jezik);
                }).map(function (l) { return l.link });

                // Only platform selected
                const arrayOfObjMatchedPlatform = await coupons.filter(function (k) {
                    if (agent.parameters.chatbot_platforma !== "")
                        return k.chatbot_platform.includes(agent.parameters.chatbot_platforma);
                }).map(function (l) { return l.link });

                // Both programming language & platform selected
                let intersection = await arrayOfObjMatchedProgLang.filter(x => arrayOfObjMatchedPlatform.includes(x));

                let responseText;

                console.log(coupons)
                if (coupons.length === 0) {
                    responseText = 'Trenutno nemamo takvih knjigaaaaaaaaaaaaaa';

                }
                else {
                    // Both selected
                    if (agent.parameters.chatbot_jezik && agent.parameters.chatbot_jezik !== "" && agent.parameters.chatbot_platforma && agent.parameters.chatbot_platforma !== "")
                        responseText = `Knjige za programski jezik ${agent.parameters.chatbot_jezik} za ${agent.parameters.chatbot_platforma} četbot platformu su dostupne na linkovima:\n` + intersection.join("\n");
                    // Only programming language
                    else if (agent.parameters.chatbot_jezik && agent.parameters.chatbot_jezik !== "")
                        responseText = `Knjige za programski jezik ${agent.parameters.chatbot_jezik} su dostupne na linkovima: \n` + arrayOfObjMatchedProgLang.join("\n");
                    // Only platform
                    else if (agent.parameters.chatbot_platforma && agent.parameters.chatbot_platforma !== "")
                        responseText = `Knjige za četbot platformu ${agent.parameters.chatbot_platforma} su dostupne na linkovima: \n` + arrayOfObjMatchedPlatform.join("\n");
                    //Neither one selected  
                    else
                        responseText = `Izvolite link ka svim našim knjigama o četbotovima:\n` +
                            `https://www.amazon.com/s?k=chatbots&i=stripbooks-intl-ship&ref=nb_sb_noss`;

                }
                agent.add(responseText);

            } catch (err) {
                return err;
            }

        }


        function fallback(agent) {                              
            agent.add(`Nisam Vas razumeo`);                    
            agent.add(`Oprostite, možete li pokušati ponovo?`);
        }

        let intentMap = new Map();
        intentMap.set('snupi', snoopy);                         
        intentMap.set('učenje kurseva', learn);
        intentMap.set('Default Fallback Intent', fallback);    

        agent.handleRequest(intentMap);
    });

}