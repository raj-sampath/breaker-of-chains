module.exports = {
    getRandomNumberList: (to, count) => {
        let randomNumberList = [];
        while(randomNumberList.length < count){

            let randomNumber = getRandomInt(to);
            if(randomNumberList.length === 0){
                randomNumberList.push(randomNumber);
            }
            else{
                if(randomNumberList.indexOf(randomNumber) === -1){
                    randomNumberList.push(randomNumber);
                }
            }
        }
        return randomNumberList;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}