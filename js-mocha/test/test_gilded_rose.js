var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('foo');
  });

  it("should have a sellIn property", function() {
    const gildedRose = new Shop([ new Item("foo", 2, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).not.to.be.undefined;
  });

  it("should have a quality property", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 4) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).not.to.be.undefined;
  });

  it("should lowers both values", function() {
    const INITIAL_SELLIN = 2;
    const INITIAL_QUALITY = 2;
    const gildedRose = new Shop([ new Item("foo", INITIAL_SELLIN, INITIAL_QUALITY) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn < INITIAL_SELLIN).to.be.true;
    expect(items[0].quality < INITIAL_QUALITY).to.be.true;
  });

  it("should quality degrades twice as fast", function() {
    const INITIAL_SELLIN = 2;
    const INITIAL_QUALITY = 4;
    const gildedRose = new Shop([ new Item("foo", INITIAL_SELLIN, INITIAL_QUALITY) ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(INITIAL_QUALITY - 1);
    items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(INITIAL_QUALITY - 2);
    items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(INITIAL_QUALITY - 4);
  });

  it("The Quality of an item is never negative", function() {
    const INITIAL_SELLIN = 2;
    const INITIAL_QUALITY = 4;
    const gildedRose = new Shop([ new Item("foo", INITIAL_SELLIN, INITIAL_QUALITY) ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality >= 0).to.be.true;
    items = gildedRose.updateQuality();
    expect(items[0].quality >= 0).to.be.true;
    items = gildedRose.updateQuality();
    expect(items[0].quality >= 0).to.be.true;
    items = gildedRose.updateQuality();
    expect(items[0].quality >= 0).to.be.true;
  });

  it("Aged Brie should increase in quality the older it gets", function() {
    const INITIAL_QUALITY = 4;
    const gildedRose = new Shop([ new Item("Aged Brie", 2, INITIAL_QUALITY) ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality > INITIAL_QUALITY).to.be.true;
    items = gildedRose.updateQuality();
    expect(items[0].quality > INITIAL_QUALITY).to.be.true;
    items = gildedRose.updateQuality();
    expect(items[0].quality > INITIAL_QUALITY).to.be.true;
  });

  it("should never be more then 50", function() {
    const INITIAL_QUALITY = 49;
    const gildedRose = new Shop([ new Item("Aged Brie", 2, INITIAL_QUALITY) ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality <= 50).to.be.true;
    items = gildedRose.updateQuality();
    expect(items[0].quality <= 50).to.be.true;
    items = gildedRose.updateQuality();
    expect(items[0].quality <= 50).to.be.true;
  });

  it("Sulfuras, Hand of Ragnaros should never has to be sold or decreases in Quality", function() {
    const INITIAL_QUALITY = 4;
    const INITIAL_SELLIN = 4;
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", INITIAL_SELLIN, INITIAL_QUALITY) ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality === INITIAL_QUALITY).to.be.true;
    expect(items[0].sellIn === INITIAL_SELLIN).to.be.true;
    items = gildedRose.updateQuality();
    expect(items[0].quality === INITIAL_QUALITY).to.be.true;
    expect(items[0].sellIn === INITIAL_SELLIN).to.be.true;
    items = gildedRose.updateQuality();
    expect(items[0].quality === INITIAL_QUALITY).to.be.true;
    expect(items[0].sellIn === INITIAL_SELLIN).to.be.true;
  });

  it("Backstage passes should increase in Quality as its SellIn value approaches - 10 DAYS", function() {
    const INITIAL_QUALITY = 10;
    const INITIAL_SELLIN = 6;
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", INITIAL_SELLIN, INITIAL_QUALITY) ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality === INITIAL_QUALITY + 2).to.be.true;
  });

  it("Backstage passes should increase in Quality as its SellIn value approaches - 5 DAYS", function() {
    const INITIAL_QUALITY = 10;
    const INITIAL_SELLIN = 4;
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", INITIAL_SELLIN, INITIAL_QUALITY) ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality === INITIAL_QUALITY + 3).to.be.true;
  });

  it.only("Backstage passes should increase in Quality as its SellIn value approaches - drops to zero", function() {
    const INITIAL_QUALITY = 10;
    const INITIAL_SELLIN = 1;
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", INITIAL_SELLIN, INITIAL_QUALITY) ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality === INITIAL_QUALITY + 3).to.be.true;
    items = gildedRose.updateQuality();
    expect(items[0].quality === 0).to.be.true;
  });


});
