<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">首頁</router-link> |
      <router-link to="/product">產品列表</router-link> |
      <router-link to="/about">關於我們</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  mounted () {
    /* const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products?page=1`;
    this.axios.get(url).then((resp) => {
      //console.log(resp.data.data);
      //console.log(resp.data.meta.pagination);
    }); */
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
