import './styles.css';
import countryCardTpl from './templates/country-card.hbs';
// import debounce from 'lodash.debounce'
import CountriesApiService from './fetchCountries';

import { alert, defaultModules} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaultModules.set(PNotifyMobile, {});

const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    inputEl: document.querySelector('input'),
    formEl: document.querySelector('form')
}
const countriesApiService = new CountriesApiService();

refs.formEl.addEventListener('input', onSearch)

function onSearch(e){
    countriesApiService.query = e.currentTarget.elements.query.value;

    countriesApiService.fetchArrayLength()
        .then(response => {
            refs.cardContainer.innerHTML = '';
            
            if(response === 1){
                return countriesApiService.fetchOneCountry()
                    .then(renderCountryCard)
                    .catch(error => console.log(error));
            } 
            
            else if (response < 10){
                return countriesApiService.fetchFewCountries()
                    .then(response => {
                        refs.cardContainer.innerHTML =  response.join('');
                    })
                    .catch(error => console.log(error));
            }

            alertNotification();
        })
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