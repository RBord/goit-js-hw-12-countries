import axios from 'axios';

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2/name';

export default class CountriesApiService {
    constructor(){
        this.searchQuery = '';
    }

    fetchCountry(){
        return axios
            .get(`/${this.searchQuery}`)
            .then(response => response.data)
    }

    get query(){
        return this.searchQuery;
    }

    set query (newQuery){
        this.searchQuery = newQuery;
    }
}