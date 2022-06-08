export default {
  setProducts(state, payload) {
    state.productsData = payload;
  },
  setCategories(state, payload) {
    state.categoriesData = payload;
  },
  setColors(state, payload) {
    state.colorsData = payload;
  },
  setMaterials(state, payload) {
    state.materialsData = payload;
  },
  setSeasons(state, payload) {
    state.seasonsData = payload;
  },
  setDeliveries(state, payload) {
    state.deliveriesData = payload;
  },
  setPayments(state, payload) {
    state.paymentsData = payload;
  },
  updateAccessKey(state, payload) {
    state.userAccessKey = payload;
  },
  updateCart(state, payload) {
    state.cartData = payload;
  },
  resetCart(state) {
    state.cartData = [];
  },
  updateOrderInfo(state, payload) {
    state.orderInfo = payload;
  },
  updateOrderError(state, payload) {
    state.orderErrorInfo = payload;
  },
  resetOrderError(state) {
    state.orderErrorInfo = null;
  },
  resetFormErrorMessage(state) {
    state.formErrorMessage = null;
  },
  updateOrderErrorMessage(state, payload) {
    state.orderErrorMessage = payload;
  }
}