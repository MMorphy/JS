tvzStore.component('basket',{
    templateUrl:'./pages/store/page-basket.template.html',
        controller:function ($scope, ItemService, CategoryService, OrderService) {
            //helper and init functions
            this.updateItemsAndCategories = function(){
                ItemService.getAllItems().then(data => {
                    this.items=data.data.items;
                });
                CategoryService.getAllCategories().then(data=>{
                    this.categories=data.data.categories;
                });
                this.orderedItems = this.getBasket();
            };
            this.findItemById = function(i){
                return this.orderedItems.find(item=>item.id==i);
            };
            this.getBasket = function () {
                let currentUser = JSON.parse(sessionStorage.getItem('loggedUser'));
                this.currentUser = currentUser;
                currentUser.basket = this.squashBasket(currentUser.basket);
                sessionStorage.setItem('loggedUser', JSON.stringify(currentUser));
                return this.squashBasket(currentUser.basket);
            };
            this.editBasket = function (basket) {
                let currentUser = JSON.parse(sessionStorage.getItem('loggedUser'));
                currentUser.basket = basket;
                sessionStorage.setItem('loggedUser', JSON.stringify(currentUser));
            };
            this.emptyBasket = function () {
                let currentUser = JSON.parse(sessionStorage.getItem('loggedUser'));
                currentUser.basket = new Array();
                sessionStorage.setItem('loggedUser', JSON.stringify(currentUser));
            };

            this.squashBasket = function(basketItems){
                let newBasket = new Array();
                let x;
                if (basketItems == null){
                    return newBasket;
                }
                for (x=0; x<basketItems.length; x++){
                    let itemToSearch = newBasket.find(item=>item.id==basketItems[x].id);
                    if(itemToSearch==null){
                        newBasket.push(basketItems[x]);
                    }
                    else{
                        newBasket[newBasket.indexOf(itemToSearch)].amount += basketItems[x].amount;
                    }
                }
                return newBasket;

            };
            this.getSubTotal = function(id){
                let item = this.findItemById(id);
                return item.amount*item.price;
            };
            this.getTotal = function () {
                let sum = 0;
                let i;
                if (this.orderedItems==null){
                    return sum;
                }
                for (i=0; i<this.orderedItems.length; i++){
                    sum+= this.orderedItems[i].amount * this.orderedItems[i].price;
                }
                return sum;
            };
            this.formatDatetime = function (unixtimestamp) {
                let date = new Date(unixtimestamp);
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let day = date.getDate();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                return year + '-' + this.fill(month) + '-' + this.fill(day) + ' ' + this.fill(hours) + ':' + this.fill(minutes) + ':' + this.fill(seconds);
            };
            this.fill = function(str){
                if (str.toString().length == 1){
                    let str2 = '0'+str.toString();
                    return str2;
                }
                else{
                    return str.toString()
                }
            };
            this.updateItemsAndCategories();
            //editing
            this.editId=-1;
            this.setEdit = function(i){
                this.editId=i;
            };
            this.confirmEdit = function(i){
                this.editBasket(this.orderedItems);
                this.editId=-1;
            };

            //deleting
            this.deleteId=-1;
            this.setDelete = function(i){
                this.deleteId=i;
            };
            this.confirmDelete = function(i){
                this.deleteId=-1;
                this.orderedItems.splice(this.orderedItems.indexOf(this.findItemById(i)), 1);
                this.editBasket(this.orderedItems);
            };

            //adding
            this.add=false;
            this.isAdding = function() {
                return this.add;
            };
            this.flipAddItem = function () {
                if (this.add == false){
                    this.add = true;
                }
                else{
                    this.add = false;
                }
            };
            this.addItem = function(){
                let j;
                this.orderedItems = this.getBasket();
                for (j=0; j<this.orderedItems.length; j++){
                    let orderToAdd={
                        address:this.new.address,
                        deliveryTime:this.formatDatetime(Date.parse(this.new.deliveryTime)),
                        finished:0,
                        user_username:this.currentUser.username,
                        item_id:this.orderedItems[j].id,
                        itemAmount:this.orderedItems[j].amount
                    };
                    let availabilityMinus = this.orderedItems[j].available - this.orderedItems[j].amount;
                    let itemToUpdate={
                        id:this.orderedItems[j].id,
                        available:availabilityMinus,
                        name:this.orderedItems[j].name,
                        price:this.orderedItems[j].price,
                        category_id:this.orderedItems[j].category_id
                    };
                    OrderService.createOrder(orderToAdd).then(data=>{
                        if (data.status==200) {
                            alert("Successfully ordered!");
                            this.flipAddItem();
                        }
                        else{
                            alert("Error while adding category!")
                            this.flipAddItem();
                        }
                    });
                    ItemService.updateItem(itemToUpdate).then(data=>{
                        if (data.status==200){
                            console.log("Item availability reduced!")
                            this.emptyBasket();
                            this.orderedItems = new Array();
                        }
                    })
                }
            }
        },
        controllerAs:'itemContr'
    })
