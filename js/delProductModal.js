export default {
  // 分頁元件
  template: '#delProductModal',
  data() {
    return {};
  },
  props: ['tempProduct', 'api'],
  methods: {
    delProduct() {
      const api = `${this.api.path}${this.api.uuid}/admin/ec/product/${id}`;
      axios.delete(api).then((response) => {
        this.$emit('update');
      });
    }
  },
}