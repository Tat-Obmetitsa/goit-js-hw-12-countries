import API from './api-service.js';
import getRefs from './get-refs';
import countriesTpl from '../templates/countries-list.hbs';
import countryTpl from '../templates/country-card.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { defaults } from '@pnotify/core';
defaults.width = '250px';
defaults.minHeight = '35px';
defaults.delay = '1000';
defaults.closer = false;
defaults.sticker = false;
defaults.addClass = 'error';
defaults.autoOpen = false; 


const refs = getRefs();
refs.searchForm.addEventListener('submit', onSearch);
// refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;

  API.fetchCountries(searchQuery)
    .then(renderedCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}
function renderedCard(countries) {
  if (countries.length > 10) {
    return onFetchError();
  }

  if (countries.length === 1) {
    renderCountryCard(countries[0]);
    return;
  }

  if (countries.length <= 10 || countries.length > 1) {
    renderCountryListCard(countries);
  }
}

function renderCountryCard(countries) {
  const markup = countryTpl(countries);
  refs.cardContainer.innerHTML = markup;
}
function renderCountryListCard(countries) {
  const markup = countriesTpl(countries);
  refs.cardContainer.innerHTML = markup;
}


function onFetchError(error) {
  alert('Упс, что-то пошло не так и мы не нашли такую страну!');
}

