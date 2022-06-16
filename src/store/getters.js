export default {
  cart(state) {
    return state.cartData.map((item) => {
      const product = state.cartProductsData.find((p) => p.product.id === item.productId);
      return {
        ...product,
        ...item
      }
    });
  },
  cartTotalPrice(_, getters) {
    return getters.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  },
  cartTotalQuantity(_, getters) {
    return getters.cart.length;
  },
}