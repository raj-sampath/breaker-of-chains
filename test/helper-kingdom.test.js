const expect = require("expect");
const kingdomData = require("../store/kingdom-store.json");
const kingdomHelper = require("../helpers/kingdom-helper");
const errorMessages = require("../error-messages");

let kingdoms = kingdomHelper.getAllKingdoms();

describe("Helper - Kingdom", () => {

    describe("#Get All Kingdoms", () => {
        it("##Should fetch all the message objects", () => {
            expect(kingdoms.length).toEqual(kingdomData.length);
        });
    
        it("##Should match the first data in the store", () => {
            expect(kingdoms[0].getEmblem()).toEqual(kingdomData[0].emblem);
        });
        
        it("##Should match the last data in the store", () => {
            expect(kingdoms[kingdoms.length - 1].getEmblem()).toEqual(kingdomData[kingdomData.length - 1].emblem);
        });
    })

    describe("#Get Kingdom from Emblem", () => {
        it("##Should return Space Kingdom", () => {
            expect(kingdomHelper.getKingdomFromEmblem("Space", kingdoms).getEmblem()).toEqual("Space");
        }); 
    
        it("##Should return Fire Kingdom", () => {
            expect(kingdomHelper.getKingdomFromEmblem("Fire", kingdoms).getAnimal()).toEqual("Dragon");
        }); 

        it("##Should return Undefined if the Emblem is not present", () => {
            expect(kingdomHelper.getKingdomFromEmblem("Undefined", kingdoms)).toEqual(undefined);
        }); 
    });

    describe("#Get Allies & Get Ruler", () => {

        describe("##No Allies & No Ruler", () => {
            it("###Should return None as Ruler when there is no Ruler", () => {
                expect(kingdomHelper.getRuler(kingdoms)).toEqual(errorMessages.NONE);
            });
        
            it("###Should return None as Allies when there is no Ruler", () => {
                expect(kingdomHelper.getAllies(kingdoms, kingdomHelper.getRuler(kingdoms))).toEqual(errorMessages.NONE);
            });
        });
    
        describe("##Space and Ice are Allies of Air", () => {
    
            let newKingdoms = kingdomHelper.getAllKingdoms();
            let spaceKingdom = kingdomHelper.getKingdomFromEmblem("Space", newKingdoms);
            let iceKingdom = kingdomHelper.getKingdomFromEmblem("Ice", newKingdoms);
            let airKingdom = kingdomHelper.getKingdomFromEmblem("Air", newKingdoms);
    
            spaceKingdom.setAlly(airKingdom);
            iceKingdom.setAlly(airKingdom);
    
            it("###Should return Air as Ruler when there is no Ruler", () => {
                expect(kingdomHelper.getRuler(newKingdoms)).toEqual("Air");
            });
        
            it("###Should return None as Allies when there is no Ruler", () => {
                expect(kingdomHelper.getAllies(newKingdoms, kingdomHelper.getRuler(newKingdoms))).toEqual(["Space", "Ice"]);
            });
        });
    
        describe("##Space is an Ally of Air, and Ice is the Ally of Water", () => {
    
            let newKingdoms = kingdomHelper.getAllKingdoms();
            let spaceKingdom = kingdomHelper.getKingdomFromEmblem("Space", newKingdoms);
            let iceKingdom = kingdomHelper.getKingdomFromEmblem("Ice", newKingdoms);
            let airKingdom = kingdomHelper.getKingdomFromEmblem("Air", newKingdoms);
            let waterKingdom = kingdomHelper.getKingdomFromEmblem("Water", newKingdoms);
    
            spaceKingdom.setAlly(airKingdom);
            iceKingdom.setAlly(waterKingdom);
    
            it("###Should return None as Ruler", () => {
                expect(kingdomHelper.getRuler(newKingdoms)).toEqual(errorMessages.NONE);
            });
        
            it("Should return None as Allies when there is no Ruler", () => {
                expect(kingdomHelper.getAllies(newKingdoms, kingdomHelper.getRuler(newKingdoms))).toEqual(errorMessages.NONE);
            });
        });
    });

    describe("#Kingdom for Coded Message", () => {
        it("Should return the Kingdom Air", () => {
            expect(kingdomHelper.getKingdomFromCodedMessage("sdasdasdasdOdfsfasdasdLsafaasdfasdW", kingdoms)).toEqual(kingdomHelper.getKingdomFromEmblem("Air", kingdoms));
        })
    
        it("Should return the Undefined Kingdom", () => {
            expect(kingdomHelper.getKingdomFromCodedMessage("sdasdasdad", kingdoms)).toEqual(undefined);
        })
    });

    describe("#Validate Contesting Kingdoms", () => {
        it("Should return Air, Water Array", () => {
            expect(kingdomHelper.validateContestingKingdoms("Air Water")).toEqual(["Air", "Water"]);
        });

        it("Should Throw Invalid List Error", () => {
            expect(() => { kingdomHelper.validateContestingKingdoms(" ")}).toThrow(/List/);
        });

        it("Should Throw Invalid Kingdoms Error", () => {
            expect(() => { kingdomHelper.validateContestingKingdoms("Foo Bar")}).toThrow(/Kingdoms/);
        });
    })
});