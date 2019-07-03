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
        this.addToBasket = function () {
            console.log("Dodano u kosaru");
        }
    },
    controllerAs:'c'
})