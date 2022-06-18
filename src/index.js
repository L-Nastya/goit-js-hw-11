import Notiflix from 'notiflix';
import ApiService from './API';

const form = document.querySelector("#search-form");
const input = document.querySelector("input"); 
const button = document.querySelector(".load-more")
const gallery = document.querySelector(".gallery");

form.addEventListener("submit", searchQ);
button.addEventListener("click", loadMore);

const newApiService = new ApiService();

function searchQ(e) {
    e.preventDefault()
  newApiService.randomName = input.value;
  newApiService.fetchPhotos().then(cardContainer)
  newApiService.resetPage()
      
}

function cardContainer(list) {
  if (newApiService.fetchPhotos.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
  } else {
    const markup = list.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`
    })
 
    gallery.innerHTML = markup.join("");
    console.log(markup)
  }
}

function loadMore() {
  newApiService.fetchPhotos()
  // newApiService.morePages()
}
 

        