<template>
  <base-form-field :title="title" :error="error">
    <textarea class="form__input form__input--area" name="comments" :placeholder="placeholder" v-model="value"></textarea>
  </base-form-field>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
}
</script>