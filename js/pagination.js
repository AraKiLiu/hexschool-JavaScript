// 分頁元件
Vue.component('pagination', {
  template: '#page',
  data() {
    return {};
  },
  /**
   * props 說明
   * 主要接受由外(Products)向內(pagination)傳遞的分頁物件，意指在 getProducts 取得的分頁物件
   */
  props: {
    pages: {},
  },
  methods: {
    emitPages(item) {
      // 透過 emit 向外傳遞我們點的分頁並觸發外層的 getProducts
      this.$emit('emit-pages', item);
    },
  },
});