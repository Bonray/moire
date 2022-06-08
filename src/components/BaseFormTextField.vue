<template>
  <base-form-field :title="title" :error="error">
    <input class="form__input" type="text" name="name" :placeholder="placeholder" v-model="value">
  </base-form-field>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [ formFieldMixin ],
}
</script>