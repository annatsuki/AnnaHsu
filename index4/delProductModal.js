Vue.component('delProductModal', {
  template: `      <div id="delProductModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 id="exampleModalLabel" class="modal-title">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger">{{ currProduct.title }}</strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
          取消
        </button>
        <button type="button" @click="delProduct" class="btn btn-danger" >
          確認刪除
        </button>
      </div>
    </div>
  </div>
</div>`,  
  data() {
      return {
      };
    },
    props: ['currProduct', 'user'],
    methods: {
      // 刪除產品
      delProduct() {
        const api = `${apiUrl}/${this.user.uuid}/admin/ec/product/${this.currProduct.id}`;
  
        //預設帶入 token
        axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
  
        axios.delete(api).then(() => {
          $('#delProductModal').modal('hide');
          this.$emit('update');
        });
      },
    }
  });