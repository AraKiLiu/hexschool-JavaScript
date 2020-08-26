<template>
  <nav class="d-flex justify-content-center">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{'disabled': pages.current_page === 1}"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="emitPages(pages.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- for抓出所有,加上prevent，避免預設事件干擾觸發，清除預設事件 -->
        <li
          v-for="(item, index) in pages.total_pages"
          :key="index"
          class="page-item"
          :class="{'active': item === pages.current_page}"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="emitPages(item)"
          >{{ item }}</a>
        </li>
        <li
          class="page-item"
          :class="{'disabled': pages.current_page === pages.total_pages}"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="emitPages(pages.current_page + 1)"
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
  data() {
    return {};
  },
  // pages接收由外向內的pagination資訊
  props: ['pages'],
  methods: {
    emitPages(item) {
      // 透過 emit 向外傳遞我們點的分頁並觸發外層的 getProducts
      this.$emit('emitPages', item);
    },
  },
};
</script>
