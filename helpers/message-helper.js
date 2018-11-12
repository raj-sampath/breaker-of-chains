const messageDao = require("../dao/message-dao");
const utils = require("../helpers/utils");
const config = require("../config");

module.exports = {
    getAllMessages: () => messageDao.getAllMessages(),

    getRandomMessages: () => {
        let randomMessageIds = utils.getRandomNumberList(messageDao.getAllMessages().length, config.NUMBER_OF_RANDOM_MESSAGES);
        return messageDao.getMessageByIds(randomMessageIds);
    }
}

