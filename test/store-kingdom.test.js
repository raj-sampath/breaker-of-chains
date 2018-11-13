const expect = require("expect");
const kingdomData = require("../store/kingdom-store.json");
const kingdomDOA = require("../dao/kingdom-dao");

describe("Store - Kingdom", () => {

    describe("#Data Validation", () => {

        it("##Should load the full Kingdom data present in the store", () => {
            let kingdoms = kingdomDOA.getAllKingdoms();
            expect(kingdoms.length).toEqual(kingdomData.length);
        });
        
        it("##Should match the first data in the store", () => {
            let kingdoms = kingdomDOA.getAllKingdoms();
            expect(kingdoms[0].getEmblem()).toEqual(kingdomData[0].emblem);
        });
        
        it("##Should match the last data in the store", () => {
            let kingdoms = kingdomDOA.getAllKingdoms();
            expect(kingdoms[kingdoms.length - 1].getEmblem()).toEqual(kingdomData[kingdomData.length - 1].emblem);
        });

    });

    describe("#Kingdom Allies", () => {

        it("##Should create all the objects with undefined allies", () => {
            let kingdoms = kingdomDOA.getAllKingdoms();
            let undefinedAllies = true;
            kingdoms.forEach((kingdom) => {
                if(kingdom.getAlly() === undefined){
                    undefinedAllies = undefinedAllies || true;
                }
                else{
                    undefinedAllies = undefinedAllies || false;
                }
            })
            expect(kingdoms[kingdoms.length - 1].getEmblem()).toEqual(kingdomData[kingdomData.length - 1].emblem);
        });

    });

    it("#Kindom is Recieveing", () => {

        it("##Should create all the objects with true isRecieveing flag", () => {
            let kingdoms = kingdomDOA.getAllKingdoms();
            let isRecieveing = true;
            kingdoms.forEach((kingdom) => isRecieveing = isRecieveing & kingdom.getIsRecieveing())
            expect(isRecieveing).toEqual(true);
        });
    });
});

