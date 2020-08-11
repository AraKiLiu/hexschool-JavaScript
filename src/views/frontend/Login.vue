<template>
  <div class="container">
      <form class="form-signin"
            @submit.prevent="signin">
        <h1 class="h3 mb-3 font-weight-normal">
          請先登入
        </h1>
        <div class="form-group">
          <label for="inputEmail"
                 class="sr-only">Email address</label>
          <input id="inputEmail"
                 v-model="user.email"
                 type="email"
                 class="form-control"
                 placeholder="Email address"
                 required
                 autofocus>
        </div>
        <div class="form-group">
          <label for="inputPassword"
                 class="sr-only">Password</label>
          <input id="inputPassword"
                 v-model="user.password"
                 type="password"
                 class="form-control"
                 placeholder="Password"
                 required>
        </div>
        <button class="btn btn-lg btn-primary btn-block"
                type="submit">
          登入
        </button>
      </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      token: '',
      products: [],
      pagination: {},
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}api/auth/login`;
      this.$http.post(api, this.user).then((response) => {
        const { token } = response.data;
        const { expired } = response.data;
        // 寫入 cookie token
        // expires 設置有效時間
        document.cookie = `token=${token};expires=${new Date(expired * 1000)}; path=/`;
        this.$router.push('admin/products');
      }).catch((error) => {
        console.log(error.response);
      });
    },
  },
};
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
