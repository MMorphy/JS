tvzStore.component('mainStore',{
    templateUrl:'./pages/store/page-store.template.html',
    controller:function (ItemService, CategoryService) {
            this.updateItemsAndCategories = function(){
                ItemService.getAllItems().then(data => {
                    this.items=data.data.items;
                });
                CategoryService.getAllCategories().then(data=>{
                    this.categories=data.data.categories;
                });
            };

        this.updateItemsAndCategories();
        this.addToBasket = function (item) {
            let currentUser = JSON.parse(sessionStorage.getItem('loggedUser'));
            if (currentUser == null){
                alert("Please login to continue shopping!!")
            }
            else{
                if (currentUser.basket == null){
                    currentUser.basket = new Array();
                }
                currentUser.basket.push(item);
                sessionStorage.setItem('loggedUser', JSON.stringify(currentUser));
                console.log(JSON.parse(sessionStorage.getItem('loggedUser')).basket);
            }
        };
    },
    controllerAs:'c'
})