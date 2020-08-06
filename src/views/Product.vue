<template>
  <div class="product">
    <h1>This is an product page</h1>
    <h2>{{product.title}}</h2>
    <p>{{product.description}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
    };
  },
  created() {
    const { id } = this.$route.params;
    this.$http.get(`${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/product/${id}`).then((response) => {
      this.product = response.data.data;
    });
  },
};
</script>
