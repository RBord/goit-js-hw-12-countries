import axios from 'axios';

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2/name';

export default class CountriesApiService {
    constructor(){
        this.searchQuery = '';
    }

    fetchOneCountry(){
        return axios
            .get(`/${this.searchQuery}`)
            .then(response => response.data)
    }

    fetchArrayLength(){
        return axios
            .get(`/${this.searchQuery}`)
            .then(response => response.data.length)
    }

    fetchFewCountries(){
        return axios
            .get(`/${this.searchQuery}`)
            .then(response => {
                return response.data.map((array) => `<li>${array.name}</li>`)
            })
    }

    get query(){
        return this.searchQuery;
    }

    set query (newQuery){
        this.searchQuery = newQuery;
    }
}