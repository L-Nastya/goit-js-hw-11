import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ApiService from './API';

const form = document.querySelector("#search-form");
const input = document.querySelector("input"); 
const button = document.querySelector(".load-more")
const gallery = document.querySelector(".gallery");

form.addEventListener("submit", searchQ);
button.addEventListener("click", loadMore);

const newApiService = new ApiService();
// button.hidden = true;

async function searchQ(e) {
  try {
    e.preventDefault()
    clearForm()
    newApiService.randomName = input.value;
    await newApiService.resetPage()
    const red = await newApiService.fetchPhotos()
    cardContainer(red)
 hjk()
  } catch (error) {
  console.log(error)
  }
}
async function hjk(totalHits) {
  const data = await newApiService.fetchPhotos()
  // const totalPages = Math.ceil(data.totalHits / 40)
  if (data.totalHits > 0)
  {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  button.hidden = false
} else {  
Notiflix.Notify.info('Cogito ergo sum');
  }
   console.log(data.totalHits)
 }
 function loadMore() {
    newApiService.fetchPhotos().then(cardContainer)
  
}
function clearForm() {
  gallery.innerHTML = "";
}
// const lightbox = new SimpleLightbox(".gallery div a", { captionsData: "alt", captionDelay: 250, });
function cardContainer(data) {
  if (data.length === 0 || newApiService.randomName === "") {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
  } else {
    const markup = data.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
      <a href="${largeImageURL}">
  <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
      <b>Downloads</b>s
      ${downloads}
    </p>
  </div>
</div>`
    }).join("")
 
    gallery.insertAdjacentHTML("beforeend", markup)
}
}
   
