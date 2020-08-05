<template>
  <div class="product">
    <h1>=> 產品列表</h1>
    <ProductList pages="1"/>
    <ProductDetail ref="productDetail"/>
    <!--<Pagination :pages="myPagination" @epages="getProducts"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'
import ProductDetail from '@/components/ProductDetail.vue'
//import Pagination from '@/components/Pagination.vue'


export default {
  name: 'Product',
  components: {
    ProductList,
    ProductDetail
  }
}

</script>
