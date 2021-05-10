import './styles.css';
import countryCardTpl from './templates/country-card.hbs';
// const debounce = require('lodash.debounce');
const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    inputEl: document.querySelector('input')

}

refs.inputEl.addEventListener('input', onSearch)

function onSearch(e){
    const value = e.currentTarget.value;
    console.log(value)
    

    fetchCountryByName(value)
        .then(renderCountryCard)
        .catch(error => console.log(error));
}

function fetchCountryByName(countryName){
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(response => {
        return response.json();
    });
}

function renderCountryCard(country){
    const markup = countryCardTpl(country);
    refs.cardContainer.innerHTML = markup;
}