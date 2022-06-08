<template>
  <ul class="catalog__list">
    <products-item v-for="product in products" :key="product.id" :id="product.id" :title="product.title" :price="product.price" :colors="product.colors" :images="product.images"></products-item>
  </ul>
</template>

<script>
import ProductsItem from '@/components/ProductsItem.vue';

export default {
  components: { ProductsItem },
  props: ['products'],
}
</script>