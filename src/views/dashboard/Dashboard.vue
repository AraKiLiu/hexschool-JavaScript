<template>
  <div class="Dashboard">
    <h1>This is an dashboard page</h1>
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
