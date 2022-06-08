<template>
  <div class="loader" :class="size"></div>
</template>

<script>
export default {
  props: ['size'],
}
</script>