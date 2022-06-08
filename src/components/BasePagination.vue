<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" :class="{ 'pagination__link--disabled' : page === 1 }" aria-label="Предыдущая страница" @click="paginate(page - 1)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNum in pagesTotal" :key="pageNum">
      <a class="pagination__link" :class="{ 'pagination__link--current': page === pageNum}" @click="paginate(pageNum)">
        {{ pageNum }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" :class="{ 'pagination__link--disabled' : page === pagesTotal }" href="#" aria-label="Следующая страница" @click="paginate(page + 1)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  emits: ['changePage'],
  props: ['page', 'perPage', 'total'],
  computed: {
    pagesTotal() {
      return Math.ceil(this.total / this.perPage);
    }
  },
  methods: {
    paginate(pageNum) {
      if (pageNum > 0 && pageNum <= this.pagesTotal) this.$emit('changePage', pageNum);
    }
  }
}
</script>