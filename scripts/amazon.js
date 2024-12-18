import {products} from "../data/products.js"
import { cart, addToCart, getCartQuantity } from "./cart.js"


function loadProducts(array){
    let productsGrid = document.getElementById("products-grid")
    productsGrid.innerHTML = ''
  array.forEach((product) => {
    productsGrid.innerHTML += `       
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="${product.getStarsUrl()}">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      ${product.getPrice()}
    </div>

    <div class="product-quantity-container">
      <select id="select-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer">${product.extraInfo()}</div>

    <div class="added-to-cart" id="check-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary" id="${product.id}">
      Add to Cart
    </button>
  </div>
`
  })
  document.querySelectorAll(`.add-to-cart-button`).forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.id, Number(document.getElementById(`select-${button.id}`).value))
      showAdded(button.id)
      updateCartQuantity()
    })
  })
  updateCartQuantity()
}

loadProducts(products);

function updateCartQuantity(){
  document.querySelector(".cart-quantity").textContent = getCartQuantity()
}

let timeout;
function showAdded(id){
  if(timeout){
    clearTimeout(timeout)
  }
  timeout = setTimeout(()=> {
    document.getElementById(`check-${id}`).style.opacity = 0
  }, 1000)
  document.getElementById(`check-${id}`).style.opacity = 100
  timeout
}