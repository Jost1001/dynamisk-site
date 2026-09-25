"use strict";
const seasonUrl = "https://kea-alt-del.dk/t7/api/seasons";
const categoriUrl = "https://kea-alt-del.dk/t7/api/categories";

const seasonList = document.querySelector(".season-grid");
const catList = document.querySelector(".categori-grid");

const seasonImages = {
  Spring: "img/spring.jpg",
  Summer: "img/summer.jpg",
  Fall: "img/fall.jpg",
  Winter: "img/winter.jpg",
};

const categoryImages = {
  Footwear: "img/shoes.jpg",
  Apparel: "img/apparel.jpg",
  FreeItems: "img/free-stuff.jpg",
  PersonalCare: "img/personal-care.jpg",
  Accessories: "img/jewelry-and-accessories.webp",
  SportingGoods: "img/sporting-goods.jpg",
};

getData();
getData2();

function getData() {
  fetch(seasonUrl).then((result) => result.json().then((data) => showData(data)));
}

function showData(data) {
  seasonList.innerHTML = "";

  let myInnerHtml = "";

  data.forEach((season) => {
    // console.log("seasons", season);
    myInnerHtml += `<article class="season-card">
    <a href="./productlist.html">
    <img src="${seasonImages[season.season] || "img/default.jpg"}" alt="Billede af ${season.season}">
    <h3>${season.season}</h3>
   </a>
    </article>`;
  });

  seasonList.innerHTML = myInnerHtml;
}

function getData2() {
  fetch(categoriUrl).then((result) => result.json().then((data) => showData2(data)));
}

function showData2(dataCat) {
  catList.innerHTML = "";

  let myInnerHtml2 = "";

  dataCat.forEach((cat) => {
    // console.log("categori", cat);
    myInnerHtml2 += `<article class="categori-card">
    <a href="/productlist.html">
    <img src="${categoryImages[cat.category] || "img/default.jpg"}" alt="Billede af ${cat.category}">
    <h3>${cat.category}</h3>
    </a>
    </article>`;
  });

  catList.innerHTML = myInnerHtml2;
}
