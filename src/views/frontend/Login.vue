<template>
  <div class="container">
      <Loading :active.sync="isLoading" />
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
      isLoading: false,
      // token: '',
      // products: [],
      // pagination: {},
    };
  },
  methods: {
    signin() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/login`;
      this.$http.post(api, this.user).then((response) => {
        const { token } = response.data;
        const { expired } = response.data;
        // 寫入 cookie token
        // expires 設置有效時間
        document.cookie = `token=${token};expires=${new Date(expired * 1000)}; path=/`;

        this.$bus.$emit('message:push', '登入成功', 'success');

        this.isLoading = false;
        this.$router.push('admin/products');
      }).catch((error) => {
        console.log(error.response);
        this.$bus.$emit('message:push', `登入失敗惹 ︴${error}`, 'danger');
        this.isLoading = false;
        this.$router.push('/');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
