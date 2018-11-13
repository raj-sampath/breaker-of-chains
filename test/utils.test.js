const utils = require("../helpers/utils");
const expect = require("expect");

describe("Generate Random Number List", () => {
    
    it("#Should return a unique list of 5 random numbers", () => {
        let randomNumberList = utils.getRandomNumberList(51, 5);
        let unique = new Set(randomNumberList);
        expect(randomNumberList.length).toEqual(unique.size).toEqual(5);
    });

    it("#Should return a unique random numbers between 0 and 50", () => {
        let randomNumberList = utils.getRandomNumberList(51, 5);
        let flag = true;
        randomNumberList.forEach((randomNumber) => {
            if(randomNumber < 0 || randomNumber > 50){
                flag = false;
            }
        });
        expect(flag).toEqual(true);
    });
})