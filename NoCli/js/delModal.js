export default {
  // 分頁元件
  template: '#delModal',
  data() {
    return {};
  },
  props: ['tempProduct', 'api'],
  methods: {
    delProduct() {
      const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
      console.log(url);
      axios.delete(url).then((response) => {
        this.$emit('update')
      }).catch((error) => {
        console.log(error);
      });
    }
  }
};