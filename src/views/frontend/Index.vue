<template>
  <div class=home>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row flex-md-row-reverse flex-column">
        <div class=" text-center col-md-6">
          <img  style="height:500px;"
          src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/oCF5Z8NUB9xRfztcVHDDJQyVJz7x4l9fTI9Zs9Dzam6kcyM1azzhZba6bK6SKWt9hCxpK4Ss2GcfXqiWPnSvcFWDvQtOsQNzdKlsAH7PToxXwF3HUCaFWLu9K15PF1t8.JPG" class="img-fluid">
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
          <h2 class="font-weight-bold">小道消息</h2>
          <h5 class="font-weight-normal text-muted mt-2">
            輸入你的電子郵件地址訂閱本所的最新商品通知，使用電子郵件接收通知
          </h5>
          <div class="input-group mb-0 mt-4">
            <input type="text" class="form-control rounded-0" placeholder="" />
            <div class="input-group-append">
              <button class="btn btn-dark rounded-0" type="button" id="search">
                訂閱
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-6 mt-md-4" v-for="(item, index) in tempProduct" :key="index">
          <div class="card border-0 mb-4 position-relative position-relative">
            <img style="height: 250px;" :src="item.imageUrl[0]"
             class="card-img-top rounded-0" alt="..."
            />
            <div class="card-body p-0">
              <h4 class="mb-0 mt-4">
                <router-link :to="`/product/${item.id}`">{{ item.title }}</router-link>
              </h4>
              <div class="d-flex justify-content-between mt-3">
                <p class="card-text text-muted mb-0 w-75 text-truncate-multiple-lines">
                  {{ item.content }}
                </p>
                <button class="btn btn-outline-dark rounded-0 text-nowrap">
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Personal></Personal>

  </div>
</template>

<script>
import Personal from '@/components/Personal.vue';

export default {
  data() {
    return {
      pagination: {},
      products: [],
      isLoading: false,
      tempProduct: {
      },
    };
  },
  components: {
    Personal,
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;
      this.$http.get(url).then((response) => {
        this.products = response.data.data;
        this.getRandomProducts();
        this.isLoading = false;
      });
    },
    getRandomProducts() {
      this.tempProduct = this.products.sort(() => (0.5 - Math.random())).slice(0, 4);
    },
  },
};
</script>

<style lang="scss" scoped>
.text-truncate-multiple-lines {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* 顯示行數 Chrome & Safari */
}
</style>
