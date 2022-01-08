import API from './js/fetchCountries';
import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';

import './css/styles.css';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const searchQuery = e.target.value;
  if (!searchQuery) {
    return resetRender();
  }

  API.fetchCountries(searchQuery.trim())
    .then(countries => {
      if (countries.length === 1) {
        return renderCardCountry(countries);
      } else if (countries.length > 1 && countries.length <= 10) {
        return renderListCountry(countries);
      } else {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
        );
      }
    })
    .catch(fetchError);
}

function renderCardCountry(country) {
  refs.countryList.innerHTML = '';
  const markup = countryCardTpl(country);
  refs.countryInfo.innerHTML = markup;
}

function renderListCountry(country) {
  refs.countryInfo.innerHTML = '';
  const markup = countryListTpl(country);
  refs.countryList.innerHTML = markup;
}

function resetRender() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function fetchError() {
  return Notiflix.Notify.failure('Oops, there is no country with that name');
}
