import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
import ApiService from './api';
const form = document.querySelector("#search-form");
const input = document.querySelector("input"); 
const loadBtn = document.querySelector(".load-more")
const gallery = document.querySelector(".gallery");
let perPage = 40;

const newApiService = new ApiService();

const searchQ = async (e) => {
  e.preventDefault();
  loadBtn.style.visibility = "hidden"
   gallery.innerHTML = "";
  renderCard()
  totalHitsmessage()
}
form.addEventListener("submit", searchQ)
loadBtn.addEventListener("click", loadMore)

    
       
function loadMore () {
  renderCard()
  
}
async function  renderCard() {
  try {
    newApiService.randomName = input.value;
    await newApiService.resetPage()
    const request = await newApiService.fetchPhotos();
    cardContainer(request)
      const array = Math.ceil(newApiService.totalHits / perPage);
    if (newApiService.page === array) {
       loadBtn.style.visibility = "hidden";
      setTimeout(() => {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }, 32000);
    }
  } catch (error) {
    console.log(error)

  }
}

async function totalHitsmessage() {
   newApiService.randomName = input.value;
  const request = await newApiService.fetchPhotos();
   if (newApiService.totalHits > 0) {
      loadBtn.style.visibility = "visible";
     Notiflix.Notify.success(`Hooray! We found ${newApiService.totalHits} images.`);
   } 
}

function cardContainer(data) {
  if (data.length === 0 || input.value === "") {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.') 
      loadBtn.style.visibility = "hidden"
  } else {
    const markup = data.map(({  webformatURL, tags, likes, views, comments, downloads }) => {
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
      <b>Downloads</b>s
      ${downloads}
    </p>
  </div>
</div>`
    }).join("")
 
    gallery.insertAdjacentHTML("beforeend", markup)
}
}


// const lightbox = new SimpleLightbox(".gallery div a", { captionsData: "alt", captionDelay: 250, });

// const  galleryl = $('.gallery div a').simpleLightbox();

// galleryl.refresh();

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });


// document.querySelector('button').addEventListener('click', () => {
//     window.scrollTo({
//         top: 200,
//         behavior: 'smooth'
//     })
// })