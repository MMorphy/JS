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
            console.log(item);
            let currentUser = JSON.parse(sessionStorage.getItem('loggedUser'));
            if (currentUser.basket == null){
                currentUser.basket = new Array();
            }
            currentUser.basket.push(item);
            sessionStorage.setItem('loggedUser', JSON.stringify(currentUser));
        }
    },
    controllerAs:'c'
})