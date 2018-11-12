const fs = require("fs");

class Kingdom {

    constructor(obj){
        Object.keys(obj).forEach((key) => this[key] = obj[key]);
        this.isRecieveing = true;
    }

    getEmblem(){
        return this.emblem
    };

    setEmblem(emblem){
        this.emblem = emblem;   
    }

    getAnimal(){
        return this.animal;
    }

    setAnimal(animal){
        this.animal = animal;
    }

    getAlly(){
        return this.ally;
    }

    setAlly(ally){
        this.ally = ally;
    }

    getIsRecieveing(){
        return this.isRecieveing;
    }

    setIsRecieveing(isRecieveing){
        this.isRecieveing = isRecieveing;
    }
}

module.exports.Kingdom = Kingdom;