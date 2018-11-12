const kingdomDao = require("../dao/kingdom-dao");
const errorMessages = require("../error-messages");

module.exports = {
    getAllKingdoms: () =>  kingdomDao.getAllKingdoms(),

    getRuler: (kingdoms) => {
        let rulerMap = {};
        let max = 0;
        let ruler;
        let numberOfAllies = 0;
        kingdoms.forEach((k) => {
            let thisAlly = k.getAlly();
            if(thisAlly !== undefined){
                if(rulerMap[thisAlly.getEmblem()] === undefined){
                    rulerMap[thisAlly.getEmblem()] = 1;
                }
                else{
                    rulerMap[thisAlly.getEmblem()] += 1;
                }
            }
        });

        let keys = Object.keys(rulerMap);
        if(keys.length > 0){
            max = rulerMap[keys[0]];
            ruler = keys[0];
            keys.forEach((key) => {
                if(max < rulerMap[key]){
                    ruler = key;
                    max = rulerMap[key];
                }
            });

            return ruler;
        }
        else{
            return errorMessages.NONE;
        }
    },

    getAllies: (kingdoms, ruler) => {
        if(ruler === errorMessages.NONE){
            return errorMessages.NONE;
        }
        else{
            let allyArray = [];
            kingdoms.forEach((k) => {
                if(k.getAlly() !== undefined && k.getAlly().getEmblem() === ruler){
                    allyArray.push(k.getEmblem());
                }
            });

            return allyArray;
        }
    },

    validateContestingKingdoms: (contestingKingdoms) => {
        contestingKingdoms = contestingKingdoms.trim();
        if(contestingKingdoms === ""){
            throw new Error("Imvalid List !!!");
        }
        else{
            let kingdomEmblemArray = contestingKingdoms.split(" ");
            if(kingdomEmblemArray.length > 0){
                let invalidEmblems = [];
                let existingEmblemList = kingdomDao.getAllKingdoms().map((k) => k.getEmblem());
                kingdomEmblemArray.forEach((emblem) => {
                    if(!isKingdomPresentInEmblemList(emblem, existingEmblemList)){
                        invalidEmblems.push(emblem);
                    }
                });

                if(invalidEmblems.length > 0){
                    throw new Error(invalidEmblems.join(",") + " Are invalid Kingdoms");
                }
                else{
                    return kingdomEmblemArray;
                }
            }
            else{
                throw new Error("Imvalid List !!!");
            }
        }
    },

    getKingdomFromCodedMessage: (codedMessage, kingdoms) => {
        let thisAnimalKingdom;
        let animalArray = kingdoms.map((a) => a.getAnimal());
        let animal = getAnimalFromCodedMessageArray(codedMessage, animalArray);
        if(animal !== undefined){
            thisAnimalKingdom = getKingdomFromAnimal(animal, kingdoms);
        }
        return thisAnimalKingdom;
    },

    getKingdomFromEmblem: (emblem, kingdoms) => {
        let thisKingdom;
        for(let i=0; i<kingdoms.length; i++){
            if(kingdoms[i].getEmblem().toLowerCase() === emblem.toLowerCase()){
                thisKingdom = kingdoms[i];
                break;
            }
        }
        return thisKingdom;
    }
};

function getKingdomFromAnimal(animal, kingdoms){
    return kingdoms.filter((k) => k.getAnimal().toLowerCase() === animal.toLowerCase())[0];
}

function getAnimalFromCodedMessageArray(codedMessage, animalArray){
    let animal;
    for(let i=0; i<animalArray.length; i++){
        var codedMessageArray = codedMessage.toString().toLowerCase().split("");
        let thisAnimalArray = animalArray[i].toLowerCase().split("");
        var numberOfLettersRemoved = 0;
        thisAnimalArray.forEach((letter) => {
            var letterIndex = codedMessageArray.indexOf(letter);
            if(letterIndex >= 0){
                var removedArray = codedMessageArray.splice(letterIndex, 1);
                if(removedArray.length > 0){
                    numberOfLettersRemoved ++ ;
                }
            }
        });

        if(numberOfLettersRemoved == thisAnimalArray.length){
            animal = animalArray[i];
            break;
        }
    }
    return animal;
}

function isKingdomPresentInEmblemList(emblem, existingEmblemList){
    let present = false;
    existingEmblemList.forEach((e) => {
        if(e.toLowerCase() === emblem.toLowerCase()){
            present = true;
        }
    });
    return present;
}