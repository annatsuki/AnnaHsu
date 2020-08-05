<template>
<div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 id="exampleModalLabel" class="modal-title">
                {{ currProduct.title }}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img :src="currProduct.image" class="img-fluid" alt>
              <blockquote class="blockquote mt-3">
                <p class="mb-0" v-html="currProduct.content"></p>
                <footer class="blockquote-footer text-right">
                  {{ currProduct.description }}
                </footer>
              </blockquote>
              <div class="d-flex justify-content-between align-items-baseline">
                <div v-if="!currProduct.price" class="h4">
                  {{ currProduct.origin_price }} 元
                </div>
                <del v-if="currProduct.price" class="h6">原價 {{ currProduct.origin_price }} 元</del>
                <div v-if="currProduct.price" class="h4">
                  現在只要 {{ currProduct.price }} 元
                </div>
              </div>
              <!--
              <select v-model="currProduct.num" name class="form-control mt-3">
                <option value="0" disabled selected>
                  請選擇數量
                </option>
                <option v-for="num in 10" :key="num" :value="num">
                  選購 {{ num }} {{ currProduct.unit }}
                </option>
              </select>
              -->
            </div>
            <!--
            <div class="modal-footer">
              <div v-if="currProduct.num" class="text-muted text-nowrap mr-3">
                小計
                <strong>{{ currProduct.num * currProduct.price }}</strong> 元
              </div>
              <button type="button" class="btn btn-primary" @click="submitDetail(currProduct, currProduct.num)">                
                加到購物車
              </button>
            </div>
            -->
          </div>
        </div>
      </div>
</template>
<script>
export default {
  name: 'ProductDetail',
  data () {
    return {
        currProduct:{
        num: 0,
        },
    }
  },
  props: {
    
  },
  created () {

  },
  methods: {
      getDetail(id){
        console.log(id);
        const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`
        this.axios.get(url).then((resp) => {
            console.log(resp.data.data);
            vm.currProduct = resp.data.data;
            vm.currProduct.num = 1;
        });
        $('#productModal').modal('show');
      },
  },
}
</script>