import API from './api-service.js';
import getRefs from './get-refs';
import countryCardTpl from '../templates/country-card.hbs';

const refs = getRefs();
refs.searchForm.addEventListener('submit', onSearch);
function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;

  API.fetchCountry(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}
function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  alert('Упс, что-то пошло не так и мы не нашли такую страну!');
}

