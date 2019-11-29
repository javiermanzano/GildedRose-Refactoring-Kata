
const {
    BACKSTAGE_PASSES,
    SULFURAS,
    MAX_QUALITY,
    AGED_BREE,
} = require('./constants');

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  increaseQuality() {
    this.quality += 1;
  }
  
  resetQuality() {
    this.quality = 0;
  }

  isSolfuras() { 
    return this.name === SULFURAS 
  };

  decreaseQuality() {
    this.quality -= 1;
  }

  decreaseSellIn() {
    this.sellIn -= 1;
  }

  isBackstagePasses() {
    return this.name === BACKSTAGE_PASSES
  }


  hasDaysLeft(days) {
    return this.sellIn <= days;
  }

  qualityCanBeIncreased() {
    return this.quality < MAX_QUALITY
  }

  itemIsAgedBree() {
    return this.name !== AGED_BREE
  }

  

}

module.exports = Item