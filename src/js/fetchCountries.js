import API from './api-service.js';
import getRefs from './get-refs';
import countriesTpl from '../templates/countries-list.hbs';
import countryTpl from '../templates/country-card.hbs';

import debounce from 'lodash.debounce';

import '@pnotify/core/dist/BrightTheme.css';
import { defaults } from '@pnotify/core';
const { error } = require('@pnotify/core');

defaults.width = '250px';
defaults.minHeight = '35px';
defaults.delay = '500';
defaults.closer = false;
defaults.sticker = false;

const refs = getRefs();
refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(evt) {
  evt.preventDefault();
  refs.cardContainer.innerHTML = '';

  const searchQuery = evt.target.value;
  API.fetchCountries(searchQuery).then(renderedCard).catch(onFetchError);
  if (!searchQuery) {
    return;
  }
}
function renderedCard(countries) {
  if (countries.length > 10) {
    return onFetchError();
  }

  if (countries.length === 1) {
    return renderCountryCard(countries[0]);
  }

  if (countries.length <= 10 || countries.length > 1) {
    return renderCountryListCard(countries);
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


function onFetchError() {
  error({
    text: 'Упс, что-то пошло не так и мы нашли слишком много совпадений!',
  });
}

