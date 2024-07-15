import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate, createRestaurantDetailReviewTemplate, createRestaurantAddDetailReviewTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-intiator';
import ButtonAddReview from '../../utils/review-button-intiator';

const Detail = {
  async render() {
    return `
    <h2 id="detail__restaurants"></h2>
    <section class="detail__restaurant" id="detail__restaurant"></section>
    <h3 id="reviewer" style="font-size: 24px; color: #212121; margin-bottom: 25px;"   background-color: #f9f9f9;
    >Tambahkan Testimoni</h3>

    <div clas="comment-session">
    
      <div class="post-comments"></div>
      <h3 id="reviewer" style="font-size: 24px; color: #212121; margin-bottom: 25px;"   background-color: #f9f9f9;
    >Testimoni</h3>
      <div class="post-comment"></div>
      
    </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#detail__restaurant');
    const restaurantReviewContainer = document.querySelector('.post-comment');
    console.log(restaurantReviewContainer);
    const restaurantAddReviewContainer = document.querySelector('.post-comments');
    console.log(restaurantAddReviewContainer);

    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
    restaurantAddReviewContainer.innerHTML = createRestaurantAddDetailReviewTemplate();
    restaurantReviewContainer.innerHTML = restaurant.customerReviews.map(
      (customer) => createRestaurantDetailReviewTemplate(customer),
    ).join('');

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        rating: restaurant.rating,
        city: restaurant.city,
        address: restaurant.address,
        pictureId: restaurant.pictureId,
        description: restaurant.description,
        foods: restaurant.menus.foods,
        drinks: restaurant.menus.drinks,
        reviews: restaurant.customerReviews,
      },
    });

    const submitAddReview = document.querySelector('.form__submit__button');
    submitAddReview.addEventListener('click', async () => {
      await ButtonAddReview.init({
        id: restaurant.id,
      });
      const result = await RestaurantSource.detailRestaurant(restaurant.id);
      restaurantReviewContainer.innerHTML = result.customerReviews.map(
        (customer) => createRestaurantDetailReviewTemplate(customer),
      ).join('');
    });
    console.log(submitAddReview);
  },
};

export default Detail;
