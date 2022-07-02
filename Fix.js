'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

const renderCountry = function (data, className = '') {
  const [countryCur] = Object.values(data.currencies);

  const html = `
      <article class="country ${className}">
      <img class="country__img" src=${data.flags.png} />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}M</p>
        <p class="country__row"><span>🗣️</span>${Object.values(
          data.languages
        )}</p>
        <p class="country__row"><span>💰</span>${countryCur.name}</p>
      </div>
      </article> 
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

let countryData = "";
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      debugger
      console.log(data);
      if(country === "India" || country === "Sri Lanka"){
        const filterData = data.find(country => country.name.common === "India")
        countryData = filterData
      }  else {
        countryData = data[0]
      }
      console.log(filterData);
      renderCountry(data[0]);
      const neighbour = data[0]?.borders && data[0]?.borders[0] ?  data[0]?.borders[0] : null;
      console.log(neighbour);
      if (!neighbour) return;

      // country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(function (response) {
      console.log(response);
      if (!response) return;
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      if (!data) return;
      renderCountry(data[0], 'neighbour');
    })
    // console.log(data);
};

const country = "india"
 getCountryData(country)
// console.log(countryData)
// const filterData = countryData.find(country => country.name.common === "India")
// console.log(filterData)

// console.log(getCountryData('bharat'));


// btn.addEventListener('click', function () {

//   btn.style.color = 'red';

 
//   // getCountryData('usa');
// });

/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function (request, response) {
    // console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data)
    const [countryCur] = Object.values(data.currencies);

    const html = `
      <article class="country">
      <img class="country__img" src=${data.flags.png} />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}M</p>
        <p class="country__row"><span>🗣️</span>${Object.values(data.languages)}</p>
        <p class="country__row"><span>💰</span>${countryCur.name}</p>
      </div>
      </article> 
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('bharat');
getCountryData('sri lanka')




/*

const renderCountry = function (data, className = '') {
  const cur = data.currencies; //.Object.keys();
  // console.log(Object.keys(cur));
  const countryCur = Object.values(cur)[0].name;
  // const countryCurS = Object.values(cur)[0].symbol;
  console.log(Object.values(cur)[0].name);
  console.log(Object.entries(cur));
  const countryLang = Object.values(data.languages)[0];
  console.log(countryLang);

  const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${countryLang}</p>
            <p class="country__row"><span>💰</span>${countryCur}
           </p>
        </div>
       </article>
   `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
}

/*

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //     console.log(data);

    // Render country 
    renderCountry(data);
    //get neighbour country 
    const [neighbour] = data.borders;
    if(!neighbour) return;

    // AJAX call country
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function() {
        // console.log(this.responseText);
        const [data2] = JSON.parse(this.responseText);
        console.log(data2);
        renderCountry(data2, 'neighbour');
    })
  });
};


getCountryAndNeighbour('bharat');
// getCountryAndNeighbour('france');
// getCountryAndNeighbour('peru');
// getCountryAndNeighbour('pak');
// getCountryData('bharat');
// getCountryData('usa');
// // getCountryData('france')
// getCountryData('pak');
// // getCountryData('peru')
// getCountryData('japan');


*/

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// const getCountryData = function (country) {
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// getCountryData('bharat');

// // getCountryAndNeighbour('france');
// // getCountryAndNeighbour('peru');
// // getCountryAndNeighbour('pak');
// // getCountryData('bharat');
// getCountryData('usa');
// getCountryData('france')
// getCountryData('pak');
// getCountryData('peru')
// getCountryData('japan');

/*
const getCountryData = country => {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => {
      console.log(res);
      if(!res.ok) {
        throw new Error(`Country not found ${res.status}`)
      }
      return res.json()
    })
    .then(data => {
      //   const [objData] = data;
      //   const neighbour = objData.borders[0];
      //   if(!neighbour) return ;
      // 
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      console.log(neighbour, data);
      if (!neighbour) return;

      //country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
    })
        .then(res => res.json())
        .then(data => renderCountry(data[0], 'neighbour'))
        .catch(err => {
          console.log(`${err} 👾👾👾👾`); 
        renderError(`something went wrong 🧨🧨🧨🧨🧨🧨 ${err.message}. try again!!`)
    }).finally(() => {
        countriesContainer.style.opacity = 1;
    })
};

btn.addEventListener('click', function () {
  getCountryData('bharat');
});

// getCountryData('japan');
// getCountryData('pak')
 */
