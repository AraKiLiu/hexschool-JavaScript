// 分頁元件
Vue.component('pagination', {
  template: '#page',
  data() {
    return {};
  },
  // pages接收由外向內的pagination資訊
  props: {
    pages: {},
  },
  methods: {
    emitPages(item) {
      // 透過 emit 向外傳遞我們點的分頁並觸發外層的 getProducts
      this.$emit('pages', item);
    },
  },
});