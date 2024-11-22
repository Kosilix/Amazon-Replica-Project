import { cart, getCartQuantity, removeFromCart, saveToStorage } from "./cart.js";
import { products } from "../data/products.js";

function loadProducts(){
  document.querySelector(".order-summary").innerHTML = ''
  cart.forEach((cartProduct) => {
    products.forEach((product) => {
      if(product.id === cartProduct.id){
        document.querySelector(".order-summary").innerHTML += `
        <div class="cart-item-container">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>
    
    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${product.image}">
    
      <div class="cart-item-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-price">
          ${(product.getPrice())}
        </div>
        <div class="product-quantity-${product.id}">
          <span>
            Quantity: <span class="quantity-label">${cartProduct.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary" data-product-id="${product.id}">
            Delete
          </span>
        </div>
      </div>
    
      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-1-${product.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-1-${product.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-1-${product.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
        `
      }
    })
  })
  document.querySelectorAll(".delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      removeFromCart(link.dataset.productId)
      loadProducts()
    })
  })
  document.querySelectorAll(".update-quantity-link").forEach((link, i) => {
    link.addEventListener("click", () => {

      link.innerHTML = ``
      document.querySelector(`.product-quantity-${cart[i].id} .quantity-label`).innerHTML = `
        <input id="${i}-quantity-input" type="number"/>
        <span class="update-quantity-${i} link-primary">Confirm</span>
        <span class="cancel-update-quantity-${i} link-primary">Cancel</span>
        <br>
        `
      document.querySelector(`.update-quantity-${i}`).addEventListener("click", () => {
        let input = document.getElementById(`${i}-quantity-input`).value
        let regex = /-\d/ 
        if(!input || regex.test(input) || input == 0) {
          loadProducts();
          return;
        } else {
          cart[i].quantity = input
          loadProducts()
          saveToStorage()
        }
      })

      document.querySelector(`.cancel-update-quantity-${i}`).addEventListener("click", () => {
        loadProducts()
      })
    })
  })

  document.querySelector(".payment-summary").innerHTML = 
  `
         <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${getCartQuantity()}):</div>
            <div class="payment-summary-money">$${findCost.productCost()}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
          `
}

let findCost = {
  productCost() {
      let total = 0;
      cart.forEach((cartProduct) => {
      products.forEach((product) => {
        if (product.id === cartProduct.id){
          total += (Number(product.priceCents) * cartProduct.quantity)
        }
      })
    })
    return (total / 100).toFixed(2)
  },

}

loadProducts()
removeFromCart()