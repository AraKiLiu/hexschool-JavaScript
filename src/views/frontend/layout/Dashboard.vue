<template>
  <div class="home">
    <loading :active.sync="isLoading" ></loading>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">前台頁面</router-link>
      <!-- <a class="navbar-brand" href="#">前台頁面</a> -->
      <button class="navbar-toggler" type="button" data-toggle="collapse"
       data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">登入</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isLoading: false,
      fullPage: true,
    };
  },
  components: {
  },
  created() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>
