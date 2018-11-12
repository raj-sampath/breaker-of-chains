const prompt = require("prompt");
const _ = require("lodash");
const converter = require('number-to-words');

const messages = require("./error-messages");
const kingdomHelper = require("./helpers/kingdom-helper");
const messageHelper = require("./helpers/message-helper");
const errorMessages = require("./error-messages");

var kindomList = kingdomHelper.getAllKingdoms();

mainPrompt();

function mainPrompt(){
    prompt.start();
    console.log(messages.MAIN_MESSAGE);
    prompt.get([{ name: "option", required: true }],  
    (err, result) => {
        if(err){
            console.log(messages.GENERIC_ERROR);
        }
        else{
            var option = parseInt(result.option);
            switch (option){
                case 1: {
                    console.log(kingdomHelper.getRuler(kindomList));
                    mainPrompt();
                    break;
                }
                case 2: {
                    console.log(kingdomHelper.getAllies(kindomList, kingdomHelper.getRuler(kindomList)));
                    mainPrompt();
                    break;
                }
                case 3: {
                    recieveContestingKingdoms();
                    break;
                }
                case 0: {
                    console.log(messages.EXIT_MESSAGE);
                    break;
                }
                default: {
                    console.log(messages.ILLEGAL_OPERATION);
                    mainPrompt();
                }
            }
        }
    });
}

function recieveContestingKingdoms(){
    prompt.start();
    prompt.get([{ name: "kingdoms", required: true }], (err, result) => {
        if(err){
            console.log(messages.GENERIC_ERROR);
        }
        else{
            try{
                let emblemMessagesArray = [];
                let kingdomEmblemArray = kingdomHelper.validateContestingKingdoms(result.kingdoms);
                kingdomEmblemArray.forEach((emblem) => {
                    let emblemKingdom = kingdomHelper.getKingdomFromEmblem(emblem, kindomList);
                    emblemKingdom.setIsRecieveing(false);
                    emblemMessagesArray.push({
                        emblem, emblemKingdom, randomMessages: messageHelper.getRandomMessages()
                    });
                });

                let balladCount = 1;
                let nextBallad = true;

                do{
                    console.log(errorMessages.ROUND_COUNT_MESSAGE.replace("{ROUND_COUNT}", converter.toWords(balladCount)));
                    emblemMessagesArray.forEach((em) => {
                        let emblemKingdom = em.emblemKingdom;
                        let randomMessages = em.randomMessages;
                        let numnerOfAllies = 0;
                        randomMessages.forEach((randomMessage) => {
                            let kingdom = kingdomHelper.getKingdomFromCodedMessage(randomMessage.getMessageText(), kindomList);
                            if(kingdom != undefined && kingdom.getAlly() == undefined
                                    && kingdom.getEmblem() !== emblemKingdom.getEmblem()
                                    && kingdom.getIsRecieveing()){
                                ++ numnerOfAllies;
                                kingdom.setAlly(emblemKingdom);
                            }
                        });
                        console.log((errorMessages.ALLIES_COUNT.replace("{KINGDOM_EMBLEM}",em.emblemKingdom.getEmblem())).replace("{NUMBER_OF_ALLIES}", numnerOfAllies));
                    });

                    if(kingdomHelper.getRuler(kindomList) !== errorMessages.NONE){
                        nextBallad = false;
                        balladCount ++;
                    }
                    //console.log(kindomList);
                }while(nextBallad);
            }
            catch(e){
                console.log(e.message);
            }
        }
        mainPrompt();
    });
}