const {
  AGED_BREE,
  SELL_IN_DAYS_EXPIRED_DAY,
  MAX_QUALITY,
  MIN_QUALITY,
  DAYS_LEFT_10,
  DAYS_LEFT_5
} = require('./constants');
const Item = require('./Item');

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if (item.name != AGED_BREE && !item.isBackstagePasses()) {
        if (item.quality > MIN_QUALITY) {
          if (!item.isSolfuras()) { item.decreaseQuality() }
        }
      } else {
        if (item.qualityCanBeIncreased()) {
          item.increaseQuality();
          if (item.isBackstagePasses()) {
            if (item.hasDaysLeft(DAYS_LEFT_10) && item.qualityCanBeIncreased()) {
              item.increaseQuality();
            }
            if (item.hasDaysLeft(DAYS_LEFT_5) && item.qualityCanBeIncreased()) {
              item.increaseQuality();
            }
          }
        }
      }
      if (!item.isSolfuras()) { item.decreaseSellIn() }
      if (item.sellIn < SELL_IN_DAYS_EXPIRED_DAY) {
        if (item.itemIsAgedBree()) {
          if (item.quality > MIN_QUALITY && !item.isSolfuras() && !item.isBackstagePasses()) {
            item.decreaseQuality();
          } else {
            item.resetQuality();
          }
        } else if (item.qualityCanBeIncreased()) {
          item.increaseQuality();
        }
      }
    });

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
