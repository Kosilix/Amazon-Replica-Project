export let cart = JSON.parse(localStorage.getItem("cartStorage")) || []

export function saveToStorage(){
  localStorage.setItem("cartStorage", JSON.stringify(cart))
}

export function addToCart(productId, quantity){
  let inCart = false
  cart.forEach((cartProduct) => {
    if (cartProduct.id === productId) {
      cartProduct.quantity += quantity
      inCart = true
    }
  })

  if(inCart === false){
    cart.push({
      quantity: quantity,
      id: productId
    })
  }
  saveToStorage()
}

export function removeFromCart(productId){
  cart.forEach((cartProduct, i) => {
    if(cartProduct.id === productId){
      cart.splice(i, 1)
      saveToStorage()
    }
  })
}


export function getCartQuantity(){
  let cartQuantity = 0
  cart.forEach((cartProduct) => {
    cartQuantity += Number(cartProduct.quantity)
  })
  return cartQuantity
}