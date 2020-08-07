<template>
  <div class="home">
    <!-- <loading :active.sync="isLoading" ></loading> -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">後台頁面</a>
      <!-- eslint-disable-next-line max-len -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">返回前台</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupons">優惠卷</router-link>
          </li>
        </ul>
      </div>
    </nav>
  <router-view :token="token" v-if="checkSuccess"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: '',
      checkSuccess: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      const url = `${process.env.VUE_APP_APIPATH}api/auth/check`;

      this.$http.post(url, {
        api_token: this.token,
      }).then((response) => {
        console.log(response);
        this.checkSuccess = true;
      }).catch((error) => {
        console.log(error);
        this.$router.push('/login');
      });
    },
  },
};
</script>
