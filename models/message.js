class Message {
    constructor(obj){
        Object.keys(obj).forEach((key) => this[key] = obj[key]);
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }

    getMessageText(){
        return this.messageText;
    }

    setMessaageText(messageText){
        this.messageText = messageText;
    }
}

module.exports.Message = Message;