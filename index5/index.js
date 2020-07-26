
const apiUrl = 'https://course-ec-api.hexschool.io/api';
const apiUUID = 'dd78fffc-469d-466b-8991-547637f6ec32';

new Vue({
  el:'#appproduct',
  data:
  {
    myProducts:'',
    myPagination:'',
    currProduct:{
      num: 0,
    },
    currBuyCar: {},
    currBuyCount: 0,
    currBuyAMT: 0,
    user:{
      url:apiUrl,
      uuid:apiUUID,
    },         
  },
  created(){
    //生命週期 Created
    // 取得 產品清單
    this.getProducts();
  },
  methods:{
    getProducts(page = 1){
      const url = `${this.user.url}/${this.user.uuid}/ec/products?page=${page}`;
      axios.get(url).then((resp)=>{
        this.myProducts = resp.data.data;
        this.myPagination = resp.data.meta.pagination;
      })
    },
    openDetail(item){
      this.currProduct = Object.assign({}, item);  
      //雙向綁定 給預設值
      this.$set(this.currProduct, 'num', 1);   
      // 使用 refs 觸發子元件方法
      this.$refs.productDetail.getDetail(this.currProduct.id);
    },
    openBuyList() {
      // 使用 refs 觸發子元件方法
      this.$refs.buyCarDetail.getBuyList();  
    },
    addBuyList(item, quantity = 1){
      var vm = this;
      const url = `${this.user.url}/${this.user.uuid}/ec/shopping`;
      //console.log(`item.num==${item.num}`);
      if(item.num == undefined || item.num == 0)
        item.num = quantity;

      const buyData = {
        product: item.id,
        quantity: item.num,
      };
      axios.post(url, buyData).then(() => {
        vm.currBuyCount = vm.currBuyCount + item.num;
        $('#productModal').modal('hide');
      }).catch((error) => {
        console.log(error.response.data.errors);
        $('#productModal').modal('hide');
      });
    },
  }
})

//取cookies函式  
function getCookie(name)
{
  var arr,reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}