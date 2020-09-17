<template>
  <div class="bg-white sticky-top">
    <div class="container">
      <nav class="navbar px-0 navbar-expand-lg navbar-light bg-white">
        <router-link class="navbar-brand position-absolute" to="/"
          style="left: 50%; transform: translate(-50%, -50%); top: 50%;">
          木製所
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link pl-0" to="/products">儲物間</router-link>
            </li>
          </ul>
        </div>
        <div class="d-flex">
          <router-link to="/cartDetail">
            <i class="fas fa-shopping-cart"></i>
            <span class="badge badge-pill badge-danger" v-if="carts.length"
            style="transform: translateX(-9px) translateY(4px)">{{ carts.length }}</span>
          </router-link>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: [],
    };
  },
  created() {
    this.getCart();
    this.$bus.$on('get-cart', () => {
      this.getCart();
    });
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(url).then((response) => {
        this.carts = response.data.data;
      });
    },
  },
};
</script>
