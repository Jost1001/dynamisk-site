const param = new URLSearchParams(window.location.search);
const selectedId = param.get("id");

// console.log(selectedId);

const prodUrl = `https://kea-alt-del.dk/t7/api/products/${selectedId}`;
const productContainer = document.querySelector(".single_product");

function getDiscountPrice(originalPrice, discount) {
  return Math.round((originalPrice * (100 - discount)) / 100);
}

function loadData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      showDetails(data);
    });
  });
}
document.querySelector(".back_button").addEventListener("click", (event) => {
  window.history.back();
});

function showDetails(detail) {
  productContainer.innerHTML = "";

  productContainer.innerHTML += ` <div class="product-image-wrap ${detail.soldout ? "soldout" : ""}">
  <img src="https://kea-alt-del.dk/t7/images/webp/640/${detail.id}.webp" alt="Product image">
  ${detail.soldout ? '<p class="soldout_tag">Udsolgt</p>' : ""}
</div>
  <div class="product_information">
                <h2>Information om produktet</h2>
                <h4>Model</h4>
                <p>${detail.productdisplayname}</p>
                <p>${detail.brandname} - ${detail.category}</p>
                <h4>Farve</h4>
                <p>${detail.basecolour}</p>
                <h4>Artikelnummer</h4>
                <p>${detail.id}</p>
                <h4>Beskrivelse</h4>
                <p>${detail.description}</p>
            </div>
            <div class="buy-box">
                <h2 class="buy">Køb</h2>
                <h3>Pris</h3>
          <div class="${detail.discount ? "offer" : ""}">
           ${detail.discount ? "<p class='discount_tag final-price'>" + getDiscountPrice(detail.price, detail.discount) + " kr</p>" : ""}
           <p class="big-info">${detail.price} kr ${detail.discount ? " - " + detail.discount + "%" : ""}
          </div>
                <form action="">
                    <label for="size">Størrelse:</label>
                    <select name="size" id="sizes">
                        <option value="xx-small">XXS</option>
                        <option value="x-small">XS</option>
                        <option value="small">S</option>
                        <option value="medium">M</option>
                        <option value="large">L</option>
                        <option value="x-large">XL</option>
                        <option value="xx-large">2XL</option>
                    </select>
                </form>
                <button>
                    <p>Læg i kurv</p>
                </button>
              </div>`;
}
loadData(prodUrl);
