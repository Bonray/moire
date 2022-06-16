import { createStore } from 'vuex';
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

export default createStore({
  state: {
    productsData: null,
    productData: null,
    categoriesData: null,
    colorsData: null,
    materialsData: null,
    seasonsData: null,
    deliveriesData: null,
    paymentsData: null,
    areFiltersLoading: false,
    areFiltersLoadingFailed: false,
    userAccessKey: null,
    isLoading: false,
    isLoadingFailed: false,
    isSending: false,
    isSendingFailed: false,
    cartData: [],
    cartProductsData: [],
    cartError: null,
    isCartLoading: false,
    isCartLoadingFailed: false,
    orderInfo: null,
    orderErrorInfo: null,
    orderErrorMessage: null,
    formErrorMessage: null,
  },
  getters,
  mutations,
  actions,
});
