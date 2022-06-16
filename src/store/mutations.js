export default {
  setProducts(state, payload) {
    state.productsData = payload;
  },
  setProductData(state, payload) {
    state.productData = payload;
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
  syncCartProducts(state) {
    state.cartData = state.cartProductsData.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity
    }));
  },
  updateCart(state, payload) {
    state.cartProductsData = payload;
  },
  updateCartProductQuantity(state, payload) {
    const item = state.cartData.find((cartItem) => cartItem.productId === payload.productId);
    if (item) item.quantity = payload.quantity;
  },
  deleteCartProduct(state, payload) {
    state.cartData = state.cartData.filter((item) => item.productId !== payload.productId);
  },
  resetCart(state) {
    state.cartProductsData = [];
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