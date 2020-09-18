<template>
  <div class="container">
    <Loading :active.sync="isLoading" />
    <div class="row justify-content-center">
      <div class="col-md-6 bg-white py-5" style="min-height: calc(100vh - 56px - 76px);">
        <div class="d-flex justify-content-between">
          <h2 class="mt-2">購物清單</h2>
        </div>

        <div class="d-flex mt-4 bg-light" v-for="item in cart" :key="item.id">
          <img :src="item.product.imageUrl[0]" alt=""
           style="width: 120px; height: 120px; object-fit: cover;">
          <div class="w-100 p-3 position-relative">
            <a href="#" class="position-absolute"
            @click.prevent="removeCartItem(item.product.id)" style="top: 16px; right: 16px;">
              <i class="fas fa-times"></i>
            </a>
            <p class="mb-0 font-weight-bold">{{ item.product.title }}</p>
            <p class="mb-1 text-muted" style="font-size: 14px;">{{ item.product.content }}</p>
            <div class="d-flex justify-content-between align-items-center w-100">
              <div class="input-group w-50 align-items-center">
                <div class="input-group-prepend pr-1">
                  <a href="#"
                  :disabled="item.quantity === 1"
                  @click.prevent="quantityUpdata(item.product.id, item.quantity - 1)">
                    <i class="fas fa-minus"></i>
                  </a>
                </div>
                <input type="text" class="form-control border-0 text-center my-auto
                 shadow-none bg-light px-0" placeholder=""
                  aria-label="Example text with button addon"
                   aria-describedby="button-addon1"
                   :value="item.quantity"
                   @keyup.enter="quantityUpdata(item.product.id, $event.target.value)"
                   >
                <div class="input-group-append pl-1">
                  <a href="#"
                  @click.prevent="quantityUpdata(item.product.id, item.quantity + 1)">
                    <i class="fas fa-plus"></i>
                  </a>
                </div>
              </div>
              <p class="mb-0 ml-auto">NT${{ item.product.price }}</p>
            </div>
          </div>
        </div>
        <!-- <table class="table mt-4 text-muted">
          <tbody>
            <tr>
              <th scope="row" class="border-0 px-0 font-weight-normal">總計</th>
              <td class="text-right border-0 px-0">NT${{ cartTotal }}</td>
            </tr>
            <tr>
              <th scope="row" class="border-0 px-0 pt-0 font-weight-normal">折扣價</th>
                <td class="text-right border-0 px-0 pt-0">
                  NT${{ cartTotal * (coupon.percent / 100) }}
                </td>
            </tr>
          </tbody>
        </table> -->
        <div class="d-flex justify-content-between mt-4">
          <p class="mb-0 h4 font-weight-bold">總計</p>
          <p class="mb-0 h4 font-weight-bold">NT${{ cartTotal }}</p>
        </div>
        <router-link class="btn btn-dark btn-block mt-4 rounded-0 py-3"
         to="/checkout">
          結帳
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  name: 'CustomerOrders',
  data() {
    return {
      products: [],
      tempProduct: {
        num: 0,
        imageUrl: [],
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
      cart: {},
      cartTotal: 0,
      coupon: {},
      isLoading: false,
      coupon_code: '',
    };
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;
      this.$http.get(url).then((response) => {
        this.products = response.data.data;
        console.log(this.products);
        this.isLoading = false;
      });
    },
    getDetailed(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(url).then((response) => {
        this.tempProduct = response.data.data;
        this.$set(this.tempProduct, 'num', 0);
        // 打開productModal
        $('#productModal').modal('show');
        this.isLoading = false;
      });
    },
    // 抓取購物車內容
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(url).then((response) => {
        this.cart = response.data.data;
        console.log(this.cart);
        this.cartTotal = 0;
        this.cart.forEach((item) => {
          this.cartTotal += (item.product.price * item.quantity);
        });
        this.isLoading = false;
      });
    },
    // 增減商品數量
    quantityUpdata(id, num) {
      // 避免商品數量低於 0 個
      if (num <= 0) return;
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const data = {
        product: id,
        quantity: num,
      };
      this.$http.patch(url, data).then(() => {
        this.isLoading = false;
        this.getCart();
      });
    },
    // 刪除購物車項目
    removeCartItem(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http.delete(url).then(() => {
        this.isLoading = false;
        this.$bus.$emit('get-cart');
        this.getCart();
      });
    },
    // 使用優惠卷
    addCoupon() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`;
      this.$http.post(url, { code: this.coupon_code }).then((response) => {
        this.coupon = response.data.data;
        this.isLoading = false;
      }).catch((error) => {
        const errorData = error.response.data.errors;
        if (errorData) {
          errorData.code.forEach((err) => {
            this.$bus.$emit('message:push',
              `加入失敗 ${err}`,
              'danger');
          });
          this.isLoading = false;
        } else {
          const { message } = error.response.data;
          this.$bus.$emit('message:push',
            `加入失敗 ${message}`,
            'danger');
          this.isLoading = false;
        }
      });
    },
  },
};
</script>
