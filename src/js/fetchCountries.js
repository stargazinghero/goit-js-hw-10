const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(countries) {
  return fetch(
    `${BASE_URL}/name/${countries}?fields=name,capital,population,flags,languages`,
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export default { fetchCountries };
