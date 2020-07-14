var app = new Vue({
    el:'#app',
    data:{
        myProducts:[
            {
                id:getUUID(),
                title:'白色短版T',
                category:'上衣類',
                content:'淺色百搭配件',
                description:'年輕款',
                imageUrl:'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
                enabled:true,
                origin_price:3000,
                price:2500,
                unit:'件',        
            },
            {
                id:getUUID(),
                title:'黑色短版T',
                category:'上衣類',
                content:'深色百搭配件',
                description:'顯瘦款',
                imageUrl:'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
                enabled:true,
                origin_price:3500,
                price:2000,
                unit:'件',      
            },            
        ],
        currProduct:{},
    },
    methods:{
        openDetail(action, item){
            DetailModal(action, item);
        },
        updateData(){
            Update();
        },
        deleteData(){
            Delete();
        }
    }
});

function DetailModal(action, item)
{
    //console.log("action="+action);
    switch (action){
        case 'new':
            app.currProduct = {}; 
            $('#productModal').modal('show');           
            break;
        case 'edit':
            app.currProduct = Object.assign({},item);
            $('#productModal').modal('show');
            break;  
        case 'delete':
            app.currProduct = Object.assign({},item);
            $('#delProductModal').modal('show');
            break;
        default:
            break;
    }    
}
function Update()
{
    //console.log("Update="+app.currProduct.id);
    if(app.currProduct.id){
        const _id = app.currProduct.id;
        app.myProducts.forEach((item,i)=>{
            if(item.id === _id){
            app.myProducts[i] = app.currProduct;
            console.log("test="+app.myProducts[i].origin_price);
            }
        });
    }
    else{
        const _id = getUUID();
        app.currProduct.id = _id;
        app.myProducts.push(app.currProduct);
    }
    app.currProduct = {};
    $('#productModal').modal('hide');
}
function Delete()
{
    if(app.currProduct.id){
        const _id = app.currProduct.id;
        app.myProducts.forEach((item,i)=>{
            if(item.id === _id){
                app.myProducts.splice(i,1);
                app.currProduct = {};
            }            
        });
    }
    $('#delProductModal').modal('hide');
}

function getUUID() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}