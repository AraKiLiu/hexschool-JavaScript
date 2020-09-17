<template>
<div class="container">
    <Loading :active.sync="isLoading" />
    <div style="min-height: 400px; background-position: center center;
     background-repeat: no-repeat; background-size: cover;"
    :style="{ backgroundImage: `url(${product.imageUrl[0]})`}">
    </div>
    <div class="row justify-content-between mt-4 mb-7">
      <div class="col-md-7">
        <h2 class="mb-0">{{ product.title }}</h2>
        <p class="font-weight-bold">NT${{ product.price }}</p>
        <p>{{ product.content }}</p>
        <div class="my-4">
          <div v-for="(item, index) in product.imageUrl" :key="index">
            <img :src="item" alt="" class="img-fluid mt-4">
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="input-group mb-3 border mt-3">
          <div class="input-group-prepend">
            <button class="btn btn-outline-dark rounded-0 border-0 py-3"
              type="button" id="button-addon1"
               @click="quantityUpdata(num - 1)">
              <i class="fas fa-minus"></i>
            </button>
          </div>
          <input
            type="text"
            class="form-control border-0 text-center my-auto shadow-none"
            placeholder="" aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            :value="num"
          >
          <div class="input-group-append">
            <button class="btn btn-outline-dark rounded-0 border-0 py-3"
              type="button" id="button-addon2"
               @click="quantityUpdata(num + 1)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>

        <button class="btn btn-dark btn-block rounded-0 py-3"
        @click="addtoCart()">加入購物車</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      productId: '',
      product: {
        imageUrl: [],
      },
      status: {
        loadingItem: '',
      },
      num: 1,
    };
  },
  created() {
    this.isLoading = true;
    this.productId = this.$route.params.productId;
    this.getProduct(this.productId);
  },
  methods: {
    getProduct(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(url).then((response) => {
        this.product = response.data.data;
        console.log(this.product);
        this.isLoading = false;
      });
    },
    addtoCart() {
      // 避免商品數量低於 0 個
      if (this.num <= 0) return;
      this.status.loadingItem = this.productId;
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: this.productId,
        quantity: this.num,
      };
      this.$http.post(url, cart).then(() => {
        this.$bus.$emit('get-cart');
        this.isLoading = false;
      });
    },
    quantityUpdata(num) {
      // 避免商品數量低於 0 個
      if (num <= 0) return;
      this.num = num;
    },
  },
};
</script>
