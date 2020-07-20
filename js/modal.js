export default {
  // 分頁元件
  template: '#modal',
  data() {
    return {
      // tempProduct: {
      //   imageUrl: [],
      // },
    };
  },
  props: ['tempProduct', 'modalTitle', 'api'],
  methods: {
    updateProduct() {
      // 要是有id，表示他為本來就已經有資料，只是要做更新，用forEach對原本的products中的id做比對，找出是哪一筆資料後做更新。
      if (this.tempProduct.id) {
        let url = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
        axios.patch(url, this.tempProduct).then((response) => {
          this.$emit('update')
        }).catch((error) => {
          console.log(error);
        });
      } else {
        // 要是沒有id表示，這筆資料是要新加入的，使用Date().getTime()所摻生的數字作為id，再將tempProduct的資料新增至products中
        this.tempProduct.id = new Date().getTime();
        console.log(this.tempProduct);
        let url = `${this.api.path}${this.api.uuid}/admin/ec/product`;
        axios.post(url, this.tempProduct).then((response) => {
          this.$emit('update')
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }
}