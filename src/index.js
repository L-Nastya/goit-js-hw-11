import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
const form = document.querySelector("#search-form");
const input = document.querySelector("input"); 
const loadBtn = document.querySelector(".load-more")
const gallery = document.querySelector(".gallery");

let page = 0;
let perPage = 40;
let totalHits;


const searchQ = (e) => {
  e.preventDefault()
  if (page > 0) {
    page = 0;
    gallery.innerHTML = "";
  } 

    renderCard()
  totalHitsmessage()
}
form.addEventListener("submit", searchQ)
loadBtn.addEventListener("click", loadMore)

     async function fetchPhotos (name)  {
        page += 1
        const URL = `https://pixabay.com/api/?key=28085560-20e71cd79b088a688c0cfa752&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
        const response = await axios.get(URL);
       totalHits = response.data.totalHits
       return response.data.hits
       
}
function loadMore () {
  renderCard()
  
}
async function  renderCard() {
  try {
    const request = await fetchPhotos(input.value);
    cardContainer(request)
      const array = Math.ceil(totalHits / perPage);
    if (page === array) {
      loadBtn.style.display = "none";
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error)

  }
}

 async function totalHitsmessage() {
  const request = await fetchPhotos(input.value);
  if (totalHits > 0) {
   Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    
}

function cardContainer(data) {
  if (data.length === 0 || input.value === "") {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.') 
    loadBtn.style.display = "none";
  } else {
     loadBtn.style.display = "block";
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