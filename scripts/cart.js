export let cart = []

export function addToCart(productId){
  cart.push({
    quantity: 1,
    id: productId
  })
}
