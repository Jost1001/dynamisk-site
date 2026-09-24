"use strict";
const seasonUrl = "https://kea-alt-del.dk/t7/api/seasons";
const categoriUrl = "https://kea-alt-del.dk/t7/api/categories";

getData();
getData2();

function getData() {
  fetch(categoriUrl).then((result) => result.json().then((data) => showData(data)));
}

function showData(dataCat) {
  dataCat.forEach((cat) => {
    console.log("categori", cat);
  });
}

function getData2() {
  fetch(seasonUrl).then((result) => result.json().then((data) => showData(data)));
}

function showData2(seasons) {
  seasons.forEach((season) => {
    console.log("seasons", season);
  });
}
