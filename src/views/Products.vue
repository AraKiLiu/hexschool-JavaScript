<template>
  <div>
    <h1>This is an products page</h1>
    <table>
      <tr v-for="item in products" :key="item.id">
        <td>{{item.title}}</td>
        <td>
          <router-link :to="`/product/${item.id}`">連結</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.$http.get(`${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products`).then((response) => {
      this.products = response.data.data;
    });
  },
};
</script>
