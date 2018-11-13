const expect = require("expect");
const messageData = require("../store/message-store.json");
const messageHelper = require("../helpers/message-helper");
const config = require("../config");

describe("Helper - Message", () => {

    describe("#Get All Messages", () => {

        it("##Should fetch all the message objects", () => {
            expect(messageHelper.getAllMessages().length).toEqual(messageData.length);
        });
    
        it("##Should match the first data in the store", () => {
            expect(messageHelper.getAllMessages()[0].getMessageText()).toEqual(messageData[0].messageText);
        });
        
        it("##Should match the last data in the store", () => {
            expect(messageHelper.getAllMessages()[messageHelper.getAllMessages().length - 1].getMessageText()).toEqual(messageData[messageData.length - 1].messageText);
        });

    });

    describe("#Random Messages", () => {

        it("##Shoould return a list of random messages with count specified in config", () => {
            expect(messageHelper.getRandomMessages().length).toEqual(config.NUMBER_OF_RANDOM_MESSAGES);
        });
    
        it("##Shoould return a list of unique random messages", () => {
            let duplicateExists = false;
            let randomMessages = messageHelper.getRandomMessages();
            let randomNumberList = randomMessages.map((m) => m.getId());
            randomNumberList.sort((a, b) => a > b);
    
            for(let i=1; i<randomNumberList.length; i++){
                if(randomNumberList[i-1] == randomNumberList[i]){
                    duplicateExists = true;
                }
            }
            
            expect(duplicateExists).toEqual(false);
        });
    });
});