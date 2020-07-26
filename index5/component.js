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
      };
    },
    props:{
      puser:{},
    },
    methods:{
      getBuyList(){
        const url = `${this.puser.url}/${this.puser.uuid}/ec/shopping`;

        axios.get(url).then((resp) => {
          this.buyCar = resp.data.data;
          // 累加總金額
          this.buyCar.forEach((item) => {
            this.buyAMT += item.product.price;
          }); 
          $('#BuyCarModal').modal('show');     
        });
      },
    },
  });
  //======== 購物車元件 End ==========