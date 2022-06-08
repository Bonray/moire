<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="img" width="120" height="120" :alt="title">
    </div>
    <h3 class="product__title">
      {{ title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет: 
      <span>
        <i :style="{'background-color': colorCode}"></i>
        {{ colorTitle }}
      </span>
    </p>
    <span class="product__code">
      Артикул: {{ itemId }}
    </span>

    <base-item-counter v-model="productAmount" :itemAmount="amount" @change-item-amount="setItemAmount"></base-item-counter>

    <b class="product__price">
      {{ price * productAmount }} ₽
    </b>

    <div class="product__status">
      <base-loader :size="'loader--small'" v-if="isSending"></base-loader>
      <span class="product__error" v-else-if="isSendingFailed">Произошла ошибка при удалении товара из корзины. Попробуйте позже!</span>
    </div>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteItem">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/config.js';
import BaseItemCounter from '@/components/BaseItemCounter.vue';

export default {
  components: { BaseItemCounter },
  props: ['title', 'img', 'basketItemId', 'itemId', 'colorCode', 'colorTitle', 'price', 'amount'],
  data() {
    return {
      isSending: false,
      isSendingFailed: false,
    }
  },
  computed: {
    productAmount: {
      get() {
        return this.amount;
      },
      async set(val) {
        this.isSending = true;
        this.isSendingFailed = false;
        try {
          const { data } = await axios.put(`${ API_URL }/baskets/products`, {
            basketItemId: this.basketItemId,
            quantity: val,
          },
          { params: { userAccessKey: this.$store.state.userAccessKey }});
          this.$store.commit('updateCart', data.items);
        } catch(err) {
          this.isSendingFailed = true;
        } finally {
          this.isSending = false;
        }
      }
    },
  },
  methods: {
    setItemAmount(val) {
      this.productAmount = val;
    },
    async deleteItem() {
      this.isSending = true;
      this.isSendingFailed = false;
      try {
        const { data } = await axios.delete(`${ API_URL }/baskets/products`, {
          params: { userAccessKey: this.$store.state.userAccessKey },
          data: { basketItemId: this.basketItemId }
        });
        this.$store.commit('updateCart', data.items);
      } catch(err) {
        this.isSendingFailed = true;
      } finally {
        this.isSending = false;
      }
    },
  }
}
</script>