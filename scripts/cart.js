export let cart = []

export function addToCart(productId){
  let inCart = false
  cart.forEach((cartProduct) => {
    if (cartProduct.id === productId) {
      cartProduct.quantity += 1
      inCart = true
    }
  })
  
  if(inCart === false){
    cart.push({
      quantity: 1,
      id: productId
    })
  }
}
