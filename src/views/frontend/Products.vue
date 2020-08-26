<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container mt-md-5 mt-3 mb-7">
      <div class="row">
        <div class="col-md-3" v-for="(item, index) in products" :key="index">
          <div class="card border-0 mb-4 position-relative position-relative">
            <div style="height: 150px; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
            <a href="#" class="text-dark">
              <i class="far fa-heart position-absolute" style="right: 16px; top: 16px"></i>
            </a>
            <div class="card-body p-0">
              <h4 class="mb-0 mt-3">
                <router-link :to="`/product/${item.id}`">{{ item.title }}</router-link>
              </h4>
              <p class="card-text text-muted mb-0 text-truncate">{{ item.content }}</p>
              <p class="text-muted mt-3">NT$ {{ item.origin_price }}</p>
            </div>
          </div>
        </div>
      </div>

      <Pagination :pages="pagination" @emitPages="getProducts" />
    </div>
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      pagination: {},
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
      carts: {},
      cartTotal: 0,
      coupon: {},
      isLoading: false,
      coupon_code: '',
    };
  },
  components: {
    Pagination,
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
        this.pagination = response.data.meta.pagination; // 取得分頁資訊
        this.isLoading = false;
      });
    },
    getProduct(id) {
      this.isLoading = true;
      this.status.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(url).then((response) => {
        this.tempProduct = response.data.data;
        this.$set(this.tempProduct, 'num', 0);
        this.status.loadingItem = '';
        // 打開productModal
        $('#productModal').modal('show');
        this.isLoading = false;
      });
    },
    addToCart(id, quantity = 1) {
      this.status.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      this.$http.post(url, cart).then(() => {
        this.status.loadingItem = '';
        this.$bus.$emit('message:push',
          '加入購物車成功 ',
          'success');
        // 關閉productModal
        $('#productModal').modal('hide');
        this.getCart();
      }).catch((error) => {
        this.status.loadingItem = '';
        const errorList = error.response.data.errors;
        errorList.forEach((err) => {
          this.$bus.$emit('message:push',
            `加入失敗 ${err}`,
            'danger');
        });
        // 關閉productModal
        $('#productModal').modal('hide');
      });
    },
    // 抓取購物車內容
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(url).then((response) => {
        this.carts = response.data.data;
        this.cartTotal = 0;
        this.carts.forEach((item) => {
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
        this.status.LoadingUpdateCart = '';
        this.isLoading = false;
        this.getCart();
      });
    },
    // 刪除購物車全部項目
    removeAllCartItem() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      this.$http.delete(url)
        .then(() => {
          this.isLoading = false;
          this.$bus.$emit('message:push',
            '刪除成功',
            'success');
          this.getCart();
        });
    },
    // 刪除購物車項目
    removeCartItem(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http.delete(url).then(() => {
        this.isLoading = false;
        this.$bus.$emit('message:push',
          '刪除成功',
          'success');
        this.getCart();
      }).catch((error) => {
        console.log(error);
      });
    },
    // 新增訂單
    createOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;

      this.$http.post(url, this.form).then((response) => {
        if (response.data.data.id) {
          this.isLoading = false;
          // 跳出訂購完成視窗
          $('#orderModal').modal('show');
          this.getCart();
        }
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
