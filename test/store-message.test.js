const expect = require("expect");
const messageData = require("../store/message-store.json");
const messageDOA = require("../dao/message-dao");

let messages = messageDOA.getAllMessages();

describe("Store - Messages", () => {

    describe("#Data Validation", () => {

        it("##Should load the full Message data present in the store", () => {
            expect(messages.length).toEqual(messageData.length);
        });
        
        it("##Should match the first data in the store", () => {
            expect(messages[0].getMessageText()).toEqual(messageData[0].messageText);
        });
        
        it("##Should match the last data in the store", () => {
            expect(messages[messages.length - 1].getMessageText()).toEqual(messageData[messageData.length - 1].messageText);
        });

    })

    describe("#Get Message bu ID", () => {

        it("#Should validate the Get Message By ID Function", () => {
            let message = messageDOA.getMessageByIds([0])[0];
            expect(message.getMessageText()).toEqual(messageData[0].messageText);
        });

    });
});

