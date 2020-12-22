const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

function fetchCountry(countryId) {
  return fetch(`${BASE_URL}/country/${countryId}`).then(response =>
    response.json(),
  );
}

export default { fetchCountry };
