import axios from "axios";
const API_KEY = '28085560-20e71cd79b088a688c0cfa752'
export default class ApiService {
    constructor() { 
        this.randomName = "";
        this.page = 1;
    }
    
    async fetchPhotos() {
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.randomName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`;
        const response = await axios.get(URL);
        console.log(response)
      const more =  this.morePages();
        console.log(more)
        return response.data.hits;
    
      
    };
 async morePages() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
}
