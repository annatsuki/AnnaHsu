<template>
<!-- app -->
    <div id="appproduct" class="container">
      <div class="text-right mt-4">
        <!-- <button @click="openBuyList()" @ecount="openBuyList" class="btn btn-primary">
          查看購物車 {{currBuyCount}}
        </button>-->
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th>產品名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="300">
              購買
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in myProducts" v-if="item.enabled" :key="i">
            <td>{{ item.title }}</td>
            <td class="text-right">
              {{ item.origin_price }}
            </td>
            <td class="text-right">
              {{ item.price }}
            </td>
            <td>
              <div class="btn-group">
                <button @click="openDetail(item)" class="btn btn-outline-primary btn-sm">
                  查看詳細
                </button>
                <!--
                <button @click="addBuyList(item)" class="btn btn-outline-danger btn-sm">
                  加入購物車
                </button>-->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- app end -->
</template>

<script>
export default {
  name: 'ProductList',
  data () {
    return {
      myProducts: '',
      myPagination: ''
    }
  },
  props: {
    pages: String
  },
  created () {
    var vm = this
    vm.getProducts();
  },
  methods: {
    getProducts(currPage) {
      var vm = this;
      currPage = currPage == null ? vm.pages : currPage;
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products?page=${currPage}`
      this.axios.get(url).then((resp) => {
        console.log(resp.data.data);
        // console.log(resp.data.meta.pagination);
        vm.myProducts = resp.data.data;
        vm.myPagination = resp.data.meta.pagination;
      })
    },
    openDetail(item){  
      var vm = this;
      // 使用 refs 觸發子元件方法
      vm.$refs.productDetail.getDetail(item.id);
    },
  },
}
</script>
