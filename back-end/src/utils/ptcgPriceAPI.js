import HttpJsonRequest from './Http';

class PtcgPrice {
  constructor(){
    this.option = {
      host: 'pokeprices.doeiqts.com',
      port: 80,
      path: "",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    this.sets = ["Celestial Storm", "Forbidden Light", "Ultra Prism", "Crimson Invasion", "Shining Legends", "Burning Shadows", "Guardians Rising", "Sun Moon", "Evolutions", "Steam Siege", "Fates Collide", "Generations", "BREAKpoint", "BREAKThrough", "Ancient Origins", "Roaring Skies", "Double Crisis", "Primal Clash", "Phantom Forces", "Furious Fists", "Flashfire", "XY", "Legendary Treasures", "Plasma Blast", "Plasma Freeze", "Plasma Storm", "Boundaries Crossed", "Dragons Exalted", "Dark Explorers", "Next Destinies", "Noble Victories", "Emerging Powers", "Black White", "Dragon Vault"];
  }
  
  PriceBySet(SetName, cb){
    const SetNameTemp = SetName.split(' ').join("%20");
    this.option.path = `/api/getset?setname=${SetNameTemp}`
    HttpJsonRequest(this.option, cb); 
  }
  GrabSets () {
    return this.sets;
  }

  PriceByName(CardName, cb){
    this.option.path = `/api/findcards?carname=${CardName}`;
    HttpJsonRequest(this.option, cb);
  }

  PriceByCard(CardSet, CardNumber, cb) {
    this.option.path = `/api/getcard?cardset=${CardSet}&cardnumber=${CardNumber}`;
    HttpJsonRequest(this.option, cb);
  }

}



module.exports = PtcgPrice;