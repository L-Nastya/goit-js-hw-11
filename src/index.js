import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import ApiService from './API';
import axios from "axios";
const form = document.querySelector("#search-form");
const input = document.querySelector("input"); 
const button = document.querySelector(".load-more")
const gallery = document.querySelector(".gallery");
const buttonS = document.querySelector("button")
console.log(buttonS)
let page = 0;


const searchS = (e) => {
  e.preventDefault()
  if (page > 0) {
    page = 0;
    gallery.innerHTML = "";
  }
   ghjk() 
 
}
buttonS.addEventListener("click", searchS)
button.addEventListener("click", load)

     async function fetchPhotos (name)  {
        // console.log(this.page)
        page += 1
        const URL = `https://pixabay.com/api/?key=28085560-20e71cd79b088a688c0cfa752&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
        const response = await axios.get(URL);
       console.log(response)
       console.log(response.data.hits)
       return response.data.hits
       
}
function load () {
  ghjk()
  
}
async function ghjk() {
  try {
    const tyuio = await fetchPhotos(input.value);
    console.log(tyuio)
    renderCard(tyuio)
  } catch (error) {
    console.log(error)

  }
}


function renderCard(card) {
  const markup = card.map((element) => 
 `<div class="photo-card">
   <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
   <div class="info">
    <p class="info-item">
      <b>Likes</b>${element.likes}
    </p>
     <p class="info-item">
       <b>Views</b>${element.views}
     </p>
     <p class="info-item">
       <b>Comments</b>${element.comments}
     </p>
     <p class="info-item">
       <b>Downloads</b>${element.downloads}
     </p>
   </div>
 </div>`
).join("")
  console.log(markup)
  gallery.insertAdjacentHTML("beforeend", markup)
}




