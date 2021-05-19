import './styles.css';
import countryCardTpl from './templates/country-card.hbs';
var debounce = require('lodash.debounce');
import CountriesApiService from './fetchCountries';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';

import * as PNotify from '@pnotify/core/dist/PNotify.js';


const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    inputEl: document.querySelector('input'),
    formEl: document.querySelector('form')
}
const countriesApiService = new CountriesApiService();

refs.inputEl.addEventListener('input', debounce(onSearch, 500));

function onSearch(e){
    countriesApiService.query = e.target.value.trim();

    if(countriesApiService.query === ""){
        noticeNotification();
    } else {
        countriesApiService.fetchCountry()
        .then(response => {
            refs.cardContainer.innerHTML = '';

            if(response.length === 1){
                return countriesApiService.fetchCountry()
                    .then(renderCountryCard)
                    .catch(error => console.log(error));
            } else if(response.length < 10){
                const liEl = response.map((array) => `<li>${array.name} </li>`)
                return refs.cardContainer.innerHTML = liEl.join('');
            } else {
                alertNotification();
            }
        })
        .catch(error => {
            console.log(`Упс, сделайте более корректный запрос. Ошибка ${error.response.status}`)
        })
    }
    
}

    
function renderCountryCard(country){
    const markup = countryCardTpl(country);
    refs.cardContainer.innerHTML = markup;
}

function noticeNotification(){
    const optionsNotification = {
        type: 'notice',
        title: 'Введите название страны',
        text: 'Сделайте корректный запрос!',
        delay: 1500,
        remove: true,
    };

    return PNotify.notice(optionsNotification);
}

function alertNotification(){
    const optionsNotification = {
        type: 'error',
        title: 'Укажите более четкий запрос!',
        text: 'Выдает более 10ти стран!',
        delay: 1500,
        remove: true,
    };

    return PNotify.error(optionsNotification);

}