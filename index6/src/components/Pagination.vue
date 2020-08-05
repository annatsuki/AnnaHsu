<template>
<nav aria-label="Page navigation example">
        <ul class="pagination">
          <li
            class="page-item"
            :class="{'disabled': ppages.current_page === 1}"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click.prevent="currPage(ppages.current_page - 1)"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            v-for="(item, index) in ppages.total_pages"
            :key="index"
            class="page-item"
            :class="{'active': item === ppages.current_page}"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="currPage(item)"
            >{{ item }}</a>
          </li>
          <li
            class="page-item"
            :class="{'disabled': ppages.current_page === ppages.total_pages}"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="currPage(ppages.current_page + 1)"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
</template>

<script>
export default {
  name: 'Pagination',
  data () {
    return {

    }
  },
  props: {
    pages: {},
  },
  methods: {
    currPage(item) {
      var vm = this;
      // 透過 emit 向外傳遞我們點的分頁並觸發外層的 getProducts        
      vm.$emit('epages', item);
    },
  },
}
</script>