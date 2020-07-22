const apiUrl= "https://course-ec-api.hexschool.io/api";

new Vue({
  el:'#appproduct',
  data:
  {
    myProducts:'',
    myPagination:'',
    currProduct:{
      imgUrl:[],
    },
    status:{
      isNew:false,
      isUpload:false,
    },
    user:{
      token:'',
      uuid:'',
    },         
  },
  created(){
    //生命週期 Created
    //主要用於取得 token 若沒有使用者沒有 token 則返回到登入畫面，若有則執行「取得全部產品」的方法。   
    this.user.token = getCookie("token");
    this.user.uuid = getCookie("annauuid");
    
    
    if(this.user.token === '' || this.user.uuid === '')
      window.location("login.html");

    // 取得 產品清單
    this.getProducts();
  },
  methods:{
    getProducts(page = 1){
      //console.log("getList="+page);
      const url = `${apiUrl}/${this.user.uuid}/admin/ec/products?page=${page}`;
      //預設帶入 token
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
      axios.get(url).then((resp)=>{
        this.myProducts = resp.data.data;
        this.myPagination = resp.data.meta.pagination;
      })

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