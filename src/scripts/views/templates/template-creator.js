import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
<div class="restaurant-card">
  <article class="post-item">
    <figure class="post-item__image">
    <img class="post-item__thumbnail lazyload" data-src="${CONFIG.BASE_IMAGE_LARGE + restaurant.pictureId}" alt="${restaurant.name}" crossorigin="anonymous">
      <figcaption class="post-item__city">${restaurant.city}</figcaption>
    </figure>
    <div class="post-item__info">
      <h2 class="post-item__name"><a href="#/detail/${restaurant.id}" style="text-decoration: none; color: #333;">${restaurant.name}</a></h2>
      <p class="post-item__rating">Rating: ${restaurant.rating}</p>
      <p class="post-item__description">${restaurant.description}</p>
    </div>
  </article>
</div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
<div class="detail__restaurant">
  <img src="${CONFIG.BASE_IMAGE_LARGE + restaurant.pictureId}" alt="${restaurant.name}" class="pictureId" crossorigin="anonymous">
  <h3 id="location">${restaurant.city}</h3>
  <p class="restaurant__content__address">${restaurant.address}</p>
  <h2 class="restaurant__Title">${restaurant.name}</h2>
  <h3 id="rating">Rating: ${restaurant.rating}</h3>
  <div class="restaurant__content">
    <p class="restaurant__content__desc">${restaurant.description}</p>
  </div>
</div>
<h3 id="menu">Menu Yang Tersedia</h3>
<section class="restaurant__menu">
  <article class="restaurant__menu__list">
    <h4>Menu Makanan</h4>
    <ul>
      ${restaurant.menus.foods.map((food) => `<li>  ${food.name}</li>`).join('')}
    </ul>
  </article>
  <article class="restaurant__menu__list">
    <h4>Menu Minuman</h4>
    <ul>
      ${restaurant.menus.drinks.map((drink) => `<li>  ${drink.name}</li>`).join('')}
    </ul>
  </article>
</section>
<div id="likeButtonContainer"></div>
`;

const createLikeButtonTemplate = () => `
<button aria-label="like this restaurant" id="likeButton" class="like">
  <i class="fa fa-bookmark" aria-hidden="true"></i> 
  Tambahkan ke favorite
</button>
`;

const createLikedButtonTemplate = () => `
<button aria-label="unlike this restaurant" id="likeButton" class="like">
  <i class="fa fa-bookmark" aria-hidden="true"></i> 
  Berhasil ditambahkan
</button>
`;

const createRestaurantAddDetailReviewTemplate = () => `
    <form>
        <div class="form-control">
            <label for="name"></label>
            <input type="text" id="name" name="name" class="form__input" placeholder="Isi Nama lengkap Anda..">
        </div>
        <div class="form-control">
            <label for="review"></label>
            <input type="text" id="review" name="name" class="form__input" placeholder="Berikan testimoni anda disini...">
            <button class="form__submit__button">Submit</button>
        </div>
    </form>
`;

const createRestaurantDetailReviewTemplate = (customer) => `
    <div class="list">
        <div class="user">
            <div class="user-image"><i class="fa-solid fa-user"></i></div>
            <div class="user-meta">
                <div class="name">${customer.name}</div>
                <div class="date">${customer.date}</div>
            </div>
        </div>
        <div class="comment-post">${customer.review}</div>
    </div>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createRestaurantDetailReviewTemplate,
  createRestaurantAddDetailReviewTemplate,
};
