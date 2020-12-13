import country from './templates/country.hbs';
import countries from './templates/countries-list.hbs';
import fetchCountries from './js/fetchCountries.js'
import {refs} from './js/refs.js';
import debounce from 'lodash.debounce';

const {error} = require('@pnotify/core');
import '../node_modules/@pnotify/core/dist/PNotify.css'
import '../node_modules/@pnotify/core/dist/Angeler.css'
import '../node_modules/@pnotify/core/dist/BrightTheme.css'
import '../node_modules/@pnotify/core/dist/Material.css'

import './styles.css';

const createMarkup = (data, createUl) => {
  createUl.innerHTML += countries(data);
};

const getData = (e) => {
  fetchCountries(e.target.value)
    .then((data)=> {
      if (data.status == 404) {
        const myError = error({
          text: "Сountry not found. Please, try to enter again.",
          maxTextHeight: null,
          delay: 3000,
          type: 'error'
        });
        console.log(myError);
      } else 
      if (data.length > 10) {
        const myError = error({
          text: "Too many matches found. Please enter a more specific query!",
          maxTextHeight: null,
          delay: 3000,
          type: 'error'
        });
        console.log(myError);
      } else
      if (data.length > 1) {
        const createUl=document.createElement('ul');
          data.forEach(item => createMarkup(item, createUl))
          refs.content.appendChild(createUl); 
      } else {
        refs.content.innerHTML = country(data[0]);
        };
    })
};

refs.getfinder.addEventListener('input',debounce(getData, 500));