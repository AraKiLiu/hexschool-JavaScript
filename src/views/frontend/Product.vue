<template>
<div class="container">
    <Loading :active.sync="isLoading" />
    <div style="min-height: 400px; background-image: url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80);
    background-position: center center;">
    </div>
    <div class="row justify-content-between mt-4 mb-7">
      <div class="col-md-7">
        <h2 class="mb-0">{{ product.title }}</h2>
        <p class="font-weight-bold">NT${{ product.price }}</p>
        <p>{{ product.content }}</p>
        <div class="my-4">
          <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="" class="img-fluid mt-4">
          <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="" class="img-fluid mt-4">
          <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="" class="img-fluid mt-4">
        </div>
      </div>
      <div class="col-md-4">
        <div class="input-group mb-3 border mt-3">
          <div class="input-group-prepend">
            <button class="btn btn-outline-dark rounded-0 border-0 py-3"
              type="button" id="button-addon1">
              <i class="fas fa-minus"></i>
            </button>
          </div>
          <input type="text" class="form-control border-0 text-center my-auto shadow-none"
            placeholder="" aria-label="Example text with button addon"
            aria-describedby="button-addon1" value="1">
          <div class="input-group-append">
            <button class="btn btn-outline-dark rounded-0 border-0 py-3"
              type="button" id="button-addon2">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <a href="./checkout.html" class="btn btn-dark btn-block rounded-0 py-3">Lorem ipsum</a>
      </div>
    </div>
  </div>
  <!-- <div class="product">
    <h1>This is an product page</h1>
    <h2>{{product.title}}</h2>
    <p>{{product.description}}</p>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      productId: '',
      product: {},
    };
  },
  created() {
    this.isLoading = true;
    this.productId = this.$route.params.productId;
    this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${this.productId}`).then((response) => {
      this.product = response.data.data;
      console.log(this.product);
      this.isLoading = false;
    });
  },
};
</script>
