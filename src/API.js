import axios from "axios";
const API_KEY = '28085560-20e71cd79b088a688c0cfa752'
export default class ApiService {
    constructor() { 
        this.randomName = "";
        this.page = 1;
    }
    
    async fetchPhotos() {
        console.log(this.page)
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.randomName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
        const response = await axios.get(URL);
        console.log(response)
          this.morePages()
        return response.data.hits;
    
      
    };
  morePages() {
        this.page += 1;
    }
   async resetPage() {
        this.page = 1;
    }
}
