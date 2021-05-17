import './styles.css';
import countryCardTpl from './templates/country-card.hbs';
import {debounce as _debounce} from 'lodash';
import CountriesApiService from './fetchCountries';

import { alert, defaultModules} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaultModules.set(PNotifyMobile, {});
// const debounced =;
const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    inputEl: document.querySelector('input'),
    formEl: document.querySelector('form')
}
const countriesApiService = new CountriesApiService();

refs.formEl.addEventListener('input', onSearch);

function onSearch(evt){
    countriesApiService.query = evt.currentTarget.elements.query.value;
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
            }

            throw new Error(alertNotification());
        })
        .catch(error => console.log(error))
}

function renderCountryCard(country){
    const markup = countryCardTpl(country);
    refs.cardContainer.innerHTML = markup;
}

function alertNotification(){
    return alert({
        text: 'Упс, больше 10ти стран!!!Введите корректный запрос'
    });
}