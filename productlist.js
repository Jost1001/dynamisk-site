"use strict";
const param = new URLSearchParams(window.location.search);
const selectedSeason = param.get("season");
const selectedCategory = param.get("category");

const productList = document.querySelector(".card_container");

let currentUrl = "";
if (selectedSeason) {
  currentUrl = `https://kea-alt-del.dk/t7/api/products?season=${selectedSeason}`;
} else if (selectedCategory) {
  currentUrl = `https://kea-alt-del.dk/t7/api/products?category=${selectedCategory}`;
} else {
  currentUrl = `https://kea-alt-del.dk/t7/api/products`;
}

function getData() {
  fetch(currentUrl).then((result) => result.json().then((data) => showData(data)));
}
function showData(products) {
  //   console.log(data);
  productList.innerHTML = "";
  let myInnerHtml = "";
  //   console.log("First product", products[0]);

  products.forEach((product) => {
    myInnerHtml += `<article class="card ${product.soldout ? "soldout" : ""} ${product.discount ? "discount" : ""}">
                <a href="product.html?id=${product.id}">
                    <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Billede af ${product.image}">
                </a>
                <h3 class="link"><a href="product.html?id=${product.id}">${product.productdisplayname}</a></h3>
                <p>${product.brandname} - ${product.articletype}</p>
          <div>
           ${product.discount ? "<p class='discount_tag'>" + getDiscountPrice(product.price, product.discount) + " kr</p>" : ""}
           <p class="tilbud">${product.price} kr</p>
          </div>
                <p><a href="product.html?id=${product.id}"><b>Læs mere</b></a></p>
                <p class="soldout_tag">Udsolgt</p>
                ${product.discount ? `<p class="discount_tag">-${product.discount}%</p>` : ""}
            </article>
`;
  });
  productList.innerHTML = myInnerHtml;
}
getData();

function getDiscountPrice(OriginalPrice, discount) {
  return Math.round((OriginalPrice * (100 - discount)) / 100);
}
