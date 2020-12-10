import './styles.css';

//с дефолтным экспортом функции fetchCountries(searchQuery), 
//возвращающей промис с массивом стран, результат запроса к API.

//https://restcountries.eu/rest/v2/name/{name}

// Создай небольшое приложение поиска данных о стране по ее частичному или полному имени. 
//Используй Rest Countries API, а именно ендпоинт /name, возвращающий массив объектов стран попавших под критерий поиска.

// Достаточно чтобы приложение работало для большинства стран. Некоторые страны, такие как Sudan, 
//могут создавать проблемы, поскольку название страны является частью названия другой страны, South Sudan. 
//Не нужно беспокоиться об этих исключениях.

// Интерфейс очень простой. Название страны для поиска пользователь вводит в текстовое поле.

// ⚠️ ВНИМАНИЕ! HTTP-запросы на бекенд происходят не по сабмиту формы, формы нет, 
//а при наборе имени страны в инпуте, то есть по событию input. Но делать HTTP-запрос при каждом 
//нажатии клавиши нельзя, так как одновременно получится много HTTP-запросов которые будут 
//выполняться в непредсказуемом порядке (race conditions). Поэтому на обработчик события необходимо 
//применить подход debounce и делать HTTP-запрос спустя 500мс после того, как пользователь перестал вводить текст. 
//Используй npm-пакет lodash.debounce.

// Если бекенд вернул больше чем 10 стран подошедших под критерий введенный пользователем, 
//в интерфейсе отображается нотификация о том, что необходимо сделать запрос более специфичным.
// Для оповещений используй плагин pnotify.

const _ = require('lodash');
const getfinder = document.querySelector('.finder');
const content = document.querySelector('.content')

//название, столица, население, языки и флаг
//<span>${country.languages-name}</span>
const createMarkup = (country) => {
    return `<li>
                <h2>${country.name}</h2>
                <h3>${country.capital}</h3>
                <span>${country.population}</span>
                <svg>
                    <use href=${country.flag}></use>
                 </svg>
            </li>
             `;
}

const getData = _.debounce((e) => {
    e.target.value;
    fetch(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
        .then((response) => {return response.json()})
        .then((data)=> {
            console.log(data);
            content.innerHTML = `<ul>${data.reduce((acc, item) => {
              acc += createMarkup(item);
              return acc;
            }, "")}</ul>`;
          })
    //console.log('hello');
  }, 500);


getfinder.addEventListener('input', getData);