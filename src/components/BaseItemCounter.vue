<template>
  <div class="form__counter" :class="{ product__counter : $route.name === 'cart' }">
    <button type="button" aria-label="Убрать один товар" :disabled="itemAmount === 1" @click="changeItemAmount(itemAmount - 1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="itemAmountVal" name="count">

    <button type="button" aria-label="Добавить один товар" @click="changeItemAmount(itemAmount + 1)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>  
</template>

<script>
export default {
  props: ['itemAmount'],
  emits: ['changeItemAmount'],
  computed: {
    itemAmountVal: {
      get() {
        return this.itemAmount;
      },
      set(val) {
        if (!val) return;
        this.$emit('changeItemAmount', val);
      }
    }
  },
  methods: {
    changeItemAmount(amount) {
      if (amount >= 1) this.$emit('changeItemAmount', amount);
    }
  }
}
</script>