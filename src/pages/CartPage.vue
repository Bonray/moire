<template>
  <main class="content container" v-if="isLoading">
    <div class="loader-wrapper">
      <base-loader></base-loader>
    </div>
  </main>
  <main class="content container" v-else-if="isLoadingFailed">
    <h1>Произошла ошибка при загрузке корзины. Попробуйте ещё раз!</h1>
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
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          Количество товаров: {{ totalQuantity }}
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <cart-item v-for="item in cart" :key="item.id" :title="item.product.title" :img="item.color.gallery[0].file.url" :basket-item-id="item.id" :item-id="item.product.id" :color-code="item.color.color.code" :color-title="item.color.color.title" :price="item.product.price" :amount="item.quantity"></cart-item>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice }} ₽</span>
          </p>

          <router-link class="cart__button button button--primery" type="submit" :to="{ name: 'order' }" v-if="cart.length">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/CartItem.vue';

export default {
  components: { CartItem },
  computed: {
    isLoading() {
      return this.$store.state.isCartLoading;
    },
    isLoadingFailed() {
      return this.$store.state.isCartLoadingFailed;
    },
    cart() {
      return this.$store.getters.cart;
    },
    totalPrice() {
      return this.$store.getters.cartTotalPrice;
    },
    totalQuantity() {
      return this.$store.getters.cartTotalQuantity;
    },
    error() {
      return this.$store.state.cartError;
    }
  }
}
</script>