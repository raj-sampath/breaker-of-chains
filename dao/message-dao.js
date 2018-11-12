const messageData = require("../store/message-store.json");
const Message = require("../models/message").Message;

module.exports = {
    getAllMessages : () => {
        let messages = [];
        messageData.forEach((message) => messages.push(new Message(message)));
        return messages;
    },

    getMessageByIds: (ids) => {
        let messages = [];
        messageData.forEach((message) => {
            if(ids.indexOf(message.id) > -1){
                messages.push(new Message(message))
            }
        });
        return messages;
    }
}