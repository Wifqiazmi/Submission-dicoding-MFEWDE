const assert = require('assert');
// eslint-disable-next-line no-unused-vars
const { async } = require('regenerator-runtime');

// eslint-disable-next-line no-undef
Feature('Liking Restaurants');

// eslint-disable-next-line no-undef
Before(({ I }) => {
  I.amOnPage('/#/like');
});

// eslint-disable-next-line no-unused-vars, no-undef
Scenario('liking a restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.post-item__name a');
  const firstRestaurant = locate('.post-item__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.post-item__name a');
  const likedRestaurantName = await I.grabTextFrom('.post-item__name a');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('unliking a restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.post-item__name a');
  const firstRestaurant = locate('.post-item__name a').first();
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.post-item__name a');

  // Klik restoran yang telah disukai
  I.click('.post-item__name a');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Kembali ke halaman favorit untuk memastikan restoran telah dihapus
  I.amOnPage('/#/like');
  I.seeElement('#restaurant-list');
  within('#restaurant-list', () => {
    I.dontSeeElement('.post-item__name a');
  });
});
