"use strict";
const productUrl = "https://kea-alt-del.dk/t7/api/products";
const productList = document.querySelector(".card_container");

getData();

function getData() {
  fetch(productUrl).then((result) => result.json().then((data) => showData(data)));
}
function showData(products) {
  //   console.log(data);
  productList.innerHTML = "";
  let myInnerHtml = "";
  //   console.log("First product", products[0]);

  products.forEach((product) => {
    myInnerHtml += `<article class="card ${product.soldout ? "soldout" : ""}">
                <a href="product.html">
                    <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Billede af ${product.image}">
                </a>
                <h3>${product.productdisplayname}}</h3>
                <p>${product.brandname} - ${product.articletype}</p>
                <div>
                    <p>${product.price} kr</p>
                </div>
                <p><a href="/product.html"><b>Læs mere</b></a></p>
                <p class="soldout_tag">Udsolgt</p>
            </article>
`;
  });
  productList.innerHTML = myInnerHtml;
}
