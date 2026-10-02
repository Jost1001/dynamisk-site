"use strict";
const param = new URLSearchParams(window.location.search);
const selectedSeason = param.get("season");
const selectedCategory = param.get("category");

const productList = document.querySelector(".card_container");
let allData;

let currentUrl = "";
if (selectedSeason && selectedCategory) {
  currentUrl = `https://kea-alt-del.dk/t7/api/products?season=${selectedSeason}&category=${selectedCategory}&limit=500`;
} else if (selectedSeason) {
  currentUrl = `https://kea-alt-del.dk/t7/api/products?season=${selectedSeason}&limit=500`;
} else if (selectedCategory) {
  currentUrl = `https://kea-alt-del.dk/t7/api/products?category=${selectedCategory}&limit=500`;
} else {
  currentUrl = `https://kea-alt-del.dk/t7/api/products`;
}

function getData() {
  fetch(currentUrl).then((result) =>
    result.json().then((data) => {
      showData(data);
      allData = data;
    }),
  );
}

document.querySelector(".back_button").addEventListener("click", (event) => {
  window.history.back();
});

// Filtrering: Gender
const filterGenderButtons = document.querySelectorAll(".gender div");
filterGenderButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    filterGenderButtons.forEach((button) => {
      button.classList.remove("selected");
    });
    evt.target.classList.add("selected");

    if (evt.target.dataset.filter === "All") {
      showData(allData);
    } else {
      const filter = allData.filter((product) => product.gender === evt.target.dataset.filter);
      showData(filter);
    }
  });
});

// Filtrering: Discount
const filterDiscountButtons = document.querySelectorAll(".discount-class div");

filterDiscountButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    filterDiscountButtons.forEach((button) => {
      button.classList.remove("selected");
    });
    evt.target.classList.add("selected");
    const selectedDiscount = evt.target.dataset.discount;

    if (selectedDiscount === "All") {
      showData(allData);
      return;
    }

    if (selectedDiscount === "No-discount") {
      const filter = allData.filter((product) => !product.discount);
      showData(filter);
      return;
    }

    if (selectedDiscount === "Discount") {
      const filter = allData.filter((product) => product.discount);
      showData(filter);
    }
  });
});

// Filtrering: Seasons
const filterSeasonButtons = document.querySelectorAll(".toj_season div");
filterSeasonButtons.forEach((button) => {
  if (button.dataset.season === selectedSeason) {
    button.classList.add("selected");
  }
  button.addEventListener("click", (evt) => {
    const params = new URLSearchParams(window.location.search);

    if (evt.target.dataset.season === "All") {
      params.delete("season");
    } else {
      params.set("season", evt.target.dataset.season);
    }

    const queryString = params.toString();
    window.location.href = queryString ? `productlist.html?${queryString}` : "productlist.html";
  });
});

// Filtrering: Categories
const filterCategoryButtons = document.querySelectorAll(".toj_category div");
filterCategoryButtons.forEach((button) => {
  if (button.dataset.category === selectedCategory) {
    button.classList.add("selected");
  }
  button.addEventListener("click", (evt) => {
    const params = new URLSearchParams(window.location.search);

    if (evt.target.dataset.category === "All") {
      params.delete("category");
    } else {
      params.set("category", evt.target.dataset.category);
    }

    const queryString = params.toString();
    window.location.href = queryString ? `productlist.html?${queryString}` : "productlist.html";
  });
});

// Filtrering: Sortér
const sortButtons = document.querySelectorAll(".sort_button");
sortButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    sortButtons.forEach((button) => {
      button.classList.remove("selected");
    });
    evt.target.classList.add("selected");
    const direction = button.textContent.includes("Low") ? "lowToHigh" : "highToLow";

    const sortedData = allData.sort((a, b) => {
      const actualPriceA = a.discount ? getDiscountPrice(a.price, a.discount) : a.price;
      const actualPriceB = b.discount ? getDiscountPrice(b.price, b.discount) : b.price;

      if (direction === "lowToHigh") {
        return actualPriceA - actualPriceB;
      }
      return actualPriceB - actualPriceA;
    });
    showData(sortedData);
  });
});

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
