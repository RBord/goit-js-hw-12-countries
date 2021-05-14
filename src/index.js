import './styles.css';
import countryCardTpl from './templates/country-card.hbs';
// import debounce = from '.lodash.debounce';
import CountriesApiService from './fetchCountries';

const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    inputEl: document.querySelector('input')
}
const countriesApiService = new CountriesApiService();

refs.inputEl.addEventListener('input', onSearch)

function onSearch(e){
    countriesApiService.query = e.currentTarget.value;
    

   countriesApiService.fetchCountries()
    .then(renderCountryCard)
    .catch(error => console.log(error));
}

function renderCountryCard(country){
    const markup = countryCardTpl(country);
    refs.cardContainer.innerHTML = markup;
}