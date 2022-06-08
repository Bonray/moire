export default {
  products(state) {
    return state.productsData;
  },
  colors(state) {
    return state.colorsData;
  },
  categories(state) {
    return state.categoriesData;
  },
  seasons(state) {
    return state.seasonsData;
  },
  materials(state) {
    return state.materialsData;
  },
  deliveries(state) {
    return state.deliveriesData;
  },
  payments(state) {
    return state.paymentsData;
  },
  cart(state) {
    return state.cartData;
  },
  cartTotalPrice(_, getters) {
    return getters.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  },
  cartTotalQuantity(_, getters) {
    return getters.cart.length;
  },
  cartError(state) {
    return state.cartError;
  },
  orderInfo(state) {
    return state.orderInfo;
  },
  formErrorInfo(state) {
    return state.orderErrorInfo;
  },
  formErrorMessage(state) {
    return state.formErrorMessage;
  },
  orderErrorMessage(state) {
    return state.orderErrorMessage;
  },
}