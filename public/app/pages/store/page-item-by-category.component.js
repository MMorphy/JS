tvzStore.component('itemByCategory',{
    templateUrl:'./pages/store/page-item-by-category.template.html',
    controller:function ($stateParams,CategoryService,ItemService) {
        this.wantedCategoryName = $stateParams.categoryName;
        this.updateItemsAndCategories = function(){
            CategoryService.getAllCategories().then(data=>{
                this.categories=data.data.categories;
                this.wantedCategory = data.data.categories.find(cat=>cat.categoryName==this.wantedCategoryName);
            });
            ItemService.getAllItems().then(data => {
                this.items=data.data.items.filter(item=>item.category_id==this.wantedCategory.categoryId);
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
            }
        };
    },
    controllerAs:'c'
})