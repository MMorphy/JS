tvzStore.component('itemByCategory',{
    templateUrl:'./pages/store/page-item-by-category.template.html',
    controller:function ($stateParams) {
        this.wantedCategory = $stateParams.categoryName;

    },
    controllerAs:'c'
})