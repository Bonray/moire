<template>
  <base-form-radio :group="group"> 
    <span class="options__value">
      {{ title }} <b>{{ +price ? `${ price } ₽` : 'бесплатно' }}</b>
    </span>
  </base-form-radio>
</template>

<script>
import BaseFormRadio from '@/components/BaseFormRadio.vue';

export default {
  components: { BaseFormRadio },
  props: ['title', 'price', 'group'],
}
</script>