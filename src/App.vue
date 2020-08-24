<template>
  <div id="app">
    <router-view/>
    <Toast />
  </div>
</template>

<script>
import Toast from '@/components/Toasts.vue';

export default {
  name: 'App',
  components: {
    Toast,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
#app {
  @import './assets/scss/main';
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
