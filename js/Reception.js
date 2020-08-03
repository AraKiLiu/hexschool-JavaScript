// 匯入語系檔案
import zh from './zh_TW.js';

// 加入樣式，JavaScript 加入 Bootstrap 樣式設定
// https://logaretm.github.io/vee-validate/guide/state.html#css-classes
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

// 加入至 VeeValidate 的設定檔案
VeeValidate.localize('tw', zh);

// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

// 掛載 Vue-Loading 套件
Vue.use(VueLoading);
// 全域註冊 VueLoading 並標籤設定為 loading
Vue.component('loading', VueLoading);

new Vue({
  el: '#app',
  data: {
    products: [],
    tempProduct: {
    },
    status: {
      loadingItem: '',
    },
    form: {
      name: '',
      email: '',
      tel: '',
      address: '',
      payment: '',
      message: '',
    },
    carts: {},
    cartTotal: 0,
    // 讀取畫面切換，true載入開啟，false載入關閉
    isLoading: false,
    UUID: '9cc644ce-dcbb-47ce-a1c2-55131daa05a0',
    apiPath: 'https://course-ec-api.hexschool.io',
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.UUID}/ec/products?page=${page}`;
      axios.get(url).then((response) => {
        this.products = response.data.data;
        this.isLoading = false;
      }).catch(error => {
        this.isLoading = false;
      });
    },
    getProduct(id) {
      this.isLoading = true;
      this.status.loadingItem = id;

      const url = `${this.apiPath}/api/${this.UUID}/ec/product/${id}`;

      axios.get(url).then((response) => {
        this.tempProduct = response.data.data;

        this.$set(this.tempProduct, 'num', 1);

        // 打開productModal
        $('#productModal').modal('show');
        this.status.loadingItem = '';
        this.isLoading = false;
      }).catch(error => {
      });
    },
    addToCart(id, quantity = 1) {
      this.status.loadingItem = id;

      const url = `${this.apiPath}/api/${this.UUID}/ec/shopping`;

      const cart = {
        product: id,
        quantity,
      };

      axios.post(url, cart).then(() => {
        this.status.loadingItem = '';
        // 關閉productModal
        $('#productModal').modal('hide');
        this.getCart();
      }).catch((error) => {
        this.status.loadingItem = '';
        console.log(error.response.data.errors);
        // 關閉productModal
        $('#productModal').modal('hide');
      });
    },
    // 抓取購物車內容
    getCart() {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.UUID}/ec/shopping`;

      axios.get(url).then((response) => {
        this.carts = response.data.data;
        this.updataTotal()
        this.isLoading = false;
      }).catch(error => {
      });
    },
    // 總價
    updataTotal(){
      this.carts.forEach((item) => {
        this.cartTotal += item.product.price*item.quantity;
      });
    },
    // 增減商品數量
    updataQuantity(id, quantity) {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.UUID}/ec/shopping`;

      const data = {
        product: id,
        quantity: quantity,
      };

      axios.patch(url, data).then(() => {
        this.status.LoadingUpdateCart = '';
        this.isLoading = false;
        this.getCart();
      }).catch(error => {
      });
    },
    // 刪除購物車全部項目
    removeAllCartItem() {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.UUID}/ec/shopping/all/product`;

      axios.delete(url)
        .then(() => {
          this.isLoading = false;
          this.getCart();
        }).catch(error => {
        });
    },
    // 刪除購物車項目
    removeCartItem(id) {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.UUID}/ec/shopping/${id}`;

      axios.delete(url).then(() => {
        this.isLoading = false;
        this.getCart();
      }).catch(error => {
      });
    },
    // 新增訂單
    createOrder() {
      this.isLoading = true;
      const url = `${this.apiPath}/api/${this.UUID}/ec/orders`;

      axios.post(url, this.form).then((response) => {
        if (response.data.data.id) {
          this.isLoading = false;
          // 跳出提示訊息
          $('#orderModal').modal('show');

          this.getCart();
        }
      }).catch((error) => {
        this.isLoading = false;
        console.log(error.response.data.errors);
      });
    },
  },
});