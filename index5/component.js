const apiUrl= "https://course-ec-api.hexschool.io/api";

//======== 分頁元件 ==========
Vue.component('comp-pagination', {
    // 分頁模板
    template: '#templatePages',
   /**
    * 元件本身的 data，但這邊不會使用
    */
    data() {
      return {
      };
    },
    /**
     * props 說明
     * 主要接受由外(Products)向內(pagination)傳遞的分頁物件，意指在 getProducts 取得的分頁物件
     */
    props: {
      ppages: {},
    },
    methods: {
      /**
       * emitPage
       * @param item 是你點擊的分頁按鈕，當你點第二頁就會傳入二，點第五頁就會傳入五以此類推
       */
      currPage(item) {
        // 透過 emit 向外傳遞我們點的分頁並觸發外層的 getProducts        
        this.$emit('epages', item);
      },
    },
  });
  //======== 分頁元件 End ==========


  //======== 產品詳細元件 ==========
  Vue.component('comp-detail',{
    template:'#templateDetail',
    data(){
      return{};
    },
    props:{
      pcurr:{},
      puser:{},
    },
    methods:{
      getDetail(id){
        //const url = `${this.puser.url}/${this.puser.uuid}/ec/product/${id}`;
        //axios.get(url).then((resp) => {
          $('#productModal').modal('show');
        //});
      },
      submitDetail(item){
        // 透過 emit 向外傳遞我們點的分頁並觸發外層的 addBuyList        
        this.$emit('ecurr', item);
      },
    },
  });
  //======== 產品詳細元件 End ==========

  //======== 購物車元件 ==========
  Vue.component('comp-buycar',{
    template:'#templateBuyCar',
    data(){
      return{
        buyCar:{},
        buyAMT: 0,
        buyCount: 0,
        isbuy:false,
      };
    },
    props:{
      puser:{},
    },
    methods:{
      getBuyList(IsShow){
        this.buyAMT = 0;
        const url = `${this.puser.url}/${this.puser.uuid}/ec/shopping`;

        axios.get(url).then((resp) => {
          this.buyCar = resp.data.data;
          // 累加總金額
          this.buyCar.forEach((item) => {
            console.log(`${item.product.title}==price==${item.product.price }==quantity==${item.quantity }`);
            
            var amt = item.product.price * item.quantity;
            this.buyAMT += amt;
            this.buyCount += item.quantity;
          }); 
          this.$emit('ecount', this.buyCount); 
          console.log(`==this.buyCount==${this.buyCount}`);

          if(IsShow != 'none')
            $('#BuyCarModal').modal('show');  
          
          this.isbuy = this.buyAMT > 0 ? true : false;
          console.log(`==this.isbuy==${this.isbuy}`);
        });
      },
      removeAllCartItem() {
        const url = `${this.puser.url}/${this.puser.uuid}/ec/shopping/all/product`;
  
        axios.delete(url)
          .then(() => {
            this.buyCar = {};
            this.buyAMT = 0;
            this.isbuy = this.buyAMT > 0 ? true : false;
          });
      },
      removeCartItem(id) {
        const url = `${this.puser.url}/${this.puser.uuid}/ec/shopping/${id}`;
  
        axios.delete(url).then(() => {
          this.getBuyList();
        });
      },
      quantityUpdata(id, num) {
        // 避免商品數量低於 0 個
        if(num <= 0) return;

        const url = `${this.puser.url}/${this.puser.uuid}/ec/shopping`;  
        const data = {
          product: id,
          quantity: num,
        };
  
        axios.patch(url, data).then(() => {
          this.getBuyList();
        });
      },
      openPayForm()
      {
        this.$emit('eform', 'open'); 
        //$('#BuyCarModal').modal('hide');
        //this.$refs.formDetail.createform(); 
      },
      closeBuyList(){
        $('#BuyCarModal').modal('hide');
      },
    },
  });
  //======== 購物車元件 End ==========

  //======== 付款表單元件 ==========
  Vue.component('comp-form',{
    template:'#templatePayForm',
    data(){
      return{
        form: {
          name: '',
          email: '',
          tel: '',
          address: '',
          payment: '',
          message: '',
        },
      };
    },
    props:{
      puser:{},
    },
    methods:{
      createform(){
        $('#PayFormModal').modal('show');
      },
      addOrderForm() {
        const url = `${this.puser.url}/${this.puser.uuid}/ec/orders`;
  
        axios.post(url, this.form).then((resp) => {
          if (resp.data.data.id) {
            // 跳出提示訊息
            alert("恭喜你已完成訂單!!");
            $('#PayFormModal').modal('hide');
          }
        }).catch((error) => {
          alert(error.response.data.errors);
          console.log(error.response.data.errors);
        });
      },
    },
  });
  //======== 付款表單元件 End ==========