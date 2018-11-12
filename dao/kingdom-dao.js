const kingdomData = require("../store/kingdom-store.json");
const Kingdom = require("../models/kingdom").Kingdom;

module.exports = {
    getAllKingdoms : () => {
        let kingdoms = [];
        kingdomData.forEach((kingdom) => kingdoms.push(new Kingdom(kingdom)));
        return kingdoms;
    }
}