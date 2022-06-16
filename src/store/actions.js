import axios from 'axios';
import router from '@/router/index';
import { API_URL } from '@/config.js';

export default {
  async loadProducts(context, payload) {
    context.state.isLoading = true;
    context.state.isLoadingFailed = false;
    try {
      const { data } = await axios.get(`${API_URL}/products`, { params: payload });
      context.commit('setProducts', data);
    } catch(err) {
      context.state.isLoadingFailed = true;
      context.state.isLoading = false;
    } finally {
      context.state.isLoading = false;
    }
  },
  async loadFilters(context) {
    context.state.areFiltersLoading = true;
    context.state.areFiltersLoadingFailed = false;
    try {
      const categoriesData = await axios.get(`${ API_URL }/productCategories`);
      context.commit('setCategories', categoriesData.data.items);
      const colorsData = await axios.get(`${ API_URL }/colors`);
      context.commit('setColors', colorsData.data.items);
      const materialsData = await axios.get(`${ API_URL }/materials`);
      context.commit('setMaterials', materialsData.data.items);
      const seasonsData = await axios.get(`${ API_URL }/seasons`);
      context.commit('setSeasons', seasonsData.data.items);
    } catch(err) {
      context.state.areFiltersLoadingFailed = true;
    } finally {
      context.state.areFiltersLoading = false;
    }
  },
  async loadDeliveries(context) {
    const { data } = await axios.get(`${ API_URL }/deliveries`);
    context.commit('setDeliveries', data);
  },
  async loadPayments(context, payload) {
    context.state.isLoading = true;
    context.state.isLoadingFailed = false;
    try {
      const { data } = await axios.get(`${ API_URL }/payments`, { params: payload });
      context.commit('setPayments', data);
    } catch(err) {
      context.state.isLoadingFailed = true;
    } finally {
      context.state.isLoading = false;
    }
  },
  async addToCart(context, payload) {
    context.state.isSending = true;
    context.state.isSendingFailed = false;
    context.state.isAdded = false;
    try {
      const { data } = await axios.post(`${ API_URL }/baskets/products`, payload, { params: { userAccessKey: context.state.userAccessKey } });
      context.commit('updateCart', data.items);
      context.commit('syncCartProducts');
    } catch(err) {
      context.state.isSendingFailed = true;
    }
    context.state.isSending = false;
    context.state.isAdded = true;
  },
  async loadCart(context) {
    context.state.isCartLoading = true;
    context.state.isCartLoadingFailed = false;
    try {
      const { data } = await axios.get(`${ API_URL }/baskets`, { params: { userAccessKey: context.state.userAccessKey } });
      if (!context.state.userAccessKey) {
        localStorage.setItem('userAccessKey', data.user.accessKey);
        context.commit('updateAccessKey', data.user.accessKey);
      }
      context.commit('updateCart', data.items);
      context.commit('syncCartProducts');
    } catch(err) {
      context.state.isCartLoadingFailed = true;
    } finally {
      context.state.isCartLoading = false;
    }
  },
  async deleteFromCart(context, payload) {
    context.commit('deleteCartProduct', { productId: payload.productId });
    try {
      const { data } = await axios.delete(`${ API_URL }/baskets/products`, {
        params: { userAccessKey: context.state.userAccessKey },
        data: payload
      });
      context.commit('updateCart', data.items);
    } catch(err) {
      context.commit('syncCartProducts');
    }
  },
  async sendOrder(context, payload) {
    context.state.isSending = true;
    context.state.isSendingFailed = false;
    try {
      context.commit('resetOrderError');
      context.commit('resetFormErrorMessage');
      const { data } = await axios.post(`${ API_URL }/orders`, payload, { params: { userAccessKey: context.state.userAccessKey } });
      context.commit('updateOrderInfo', data);
      context.commit('resetCart');
      router.push({ name: 'orderInfo', params: { id: data.id} });
    } catch(err) {
      context.state.isSendingFailed = true;
      context.commit('updateOrderError', err.response.data.error.request);
      context.commit('updateOrderErrorMessage', err.response.data.error.message);
    } finally {
      context.state.isSending = false;
    }
  },
  async loadOrderInfo(context, payload) {
    context.state.isLoading = true;
    context.state.isLoadingFailed = false;
    try {
      const { data } = await axios.get(`${ API_URL }/orders/${payload}`, { params: { userAccessKey: context.state.userAccessKey } });
      context.commit('updateOrderInfo', data);
    } catch(err) {
      context.state.isLoadingFailed = true;
    } finally {
      context.state.isLoading = false;
    }
  }
}