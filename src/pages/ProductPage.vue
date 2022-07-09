<template>
  <main class="content container" v-if="isLoading">
    <div class="loader-wrapper">
      <base-loader></base-loader>
    </div>
  </main>
  <main class="content container" v-else-if="isLoadingFailed">
    <h1>Проиошла ошибка при загрузке товара. Пожалуйста, попробуйте зайти сюда позже.</h1>
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main', query: { 'categoryId': product.category.id } }">
            {{ product.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="gallery[activeColorIdx].image" :alt="product.title">
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="image in gallery" :key="image.id">
            <a href="" class="pics__link" :class="{ 'pics__link--current': image.id === activeColorId }" @click.prevent="changeImg(image.id)">
              <img width="98" height="98" :src="image.image" :alt="product.title">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <div class="item__row item__row--center">
              <base-item-counter v-model="productAmount" :itemAmount="productAmount" @change-item-amount="setItemAmount"></base-item-counter>
              
              <b class="item__price">
                {{ product.price }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color in product.colors" :key="color.id">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color" :value="color.color.id" :checked="activeColorId === color.color.id" v-model="activeColorId">
                      <span class="colors__value" :style="{ 'background-color': color.color.code}">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category" v-model="activeSizeId">
                    <option :value="size.id" v-for="size in product.sizes" :key="size.id">{{ size.title }}</option>
                  </select>
                </label>
              </fieldset>
            </div>
            
            <button class="item__button button button--primery" type="submit" :disabled="isSending" @click.prevent="addToCart">
              В корзину
            </button>
            <p v-if="isSending">Добавляем товар в корзину...</p>
            <p v-if="isSendingFailed">Произошла ошибка при добавлении товара в корзину. Попробуйте ещё раз!</p>
            <p v-else-if="isAdded">Товар успешно добавлен в корзину!</p>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link" :class="{'tabs__link--current': selectedTab === 'base-item-content'}" @click="setSelectedComponent('base-item-content')">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" :class="{'tabs__link--current': selectedTab === 'base-item-delivery'}" @click="setSelectedComponent('base-item-delivery')">
              Доставка и возврат
            </a>
          </li>
        </ul>
        
        <component :is="selectedTab"></component>
      </div>
    </section>
  </main> 
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/config.js';
import BaseItemCounter from '@/components/BaseItemCounter.vue';
import BaseItemContent from '@/components/BaseItemContent.vue';
import BaseItemDelivery from '@/components/BaseItemDelivery.vue';

export default {
  components: { BaseItemCounter, BaseItemContent, BaseItemDelivery },
  data() {
    return {
      productAmount: 1,
      isLoading: false,
      isLoadingFailed: false,
      isSending: false,
      isSendingFailed: false,
      isAdded: false,
      productData: null,
      activeColorIdx: 0,
      activeSizeIdx: 0,
      selectedTab: 'base-item-content',
    }
  },
  computed: {
    product() {
      return {
        ...this.productData,
        gallery: this.productData.colors.map(color => {
          return {
            id: color.color.id,
            image: color.gallery ? color.gallery[0].file.url : 'https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png'
          }
        })
      };
    },
    gallery() {
      return this.product.gallery;
    },
    activeColorId: {
      get() {
        return this.gallery[this.activeColorIdx].id;
      },
      set(id) {
        const idx = this.gallery.findIndex((item) => item.id === id);
        this.activeColorIdx = idx;
      }
    },
    activeSizeId: {
      get() {
        return this.product.sizes[this.activeSizeIdx].id;
      },
      set(id) {
        const idx = this.product.sizes.findIndex((item) => item.id === id);
        this.activeSizeIdx = idx;
      }
    }
  },
  methods: {
    async loadProduct() {
      this.isLoading = true;
      this.isLoadingFailed = false;
      try {
        const { data } = await axios.get(`${API_URL}/products/${this.$route.params.id}`);
        console.log(data);
        this.productData = data;
      } catch(err) {
        this.isLoading = false;
        this.isLoadingFailed = true;
      }
      this.isLoading = false;
    },
    setItemAmount(val) {
      this.productAmount = val;
    },
    changeImg(id) {
      const idx = this.gallery.findIndex((item) => item.id === id);
      this.activeColorIdx = idx;
    },
    async addToCart() {
      this.isSending = true;
      this.isAdded = false;
      this.isSendingFailed = false;
      try {
        await this.$store.dispatch('addToCart', {
          productId: this.product.id,
          colorId: this.activeColorId,
          sizeId: this.activeSizeId,
          quantity: this.productAmount
        });
      } catch(err) {
        this.isSendingFailed = true;
      }
      this.isSending = false;
      this.isAdded = true;
    },
    setSelectedComponent(val) {
      this.selectedTab = val;
    }
  },
  created() {
    this.loadProduct();
  }
}
</script>