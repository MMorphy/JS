tvzStore.component('sideBar', {
    template:`
    <div class="panel panel-default col-lg-2" style="float: right; margin: 5px;">
        <div class="panel-heading">
            <h4>Categories</h4>
        </div>
        <div ng-repeat="category in side.categories" class="panel-body">
            <a ui-sref="itemsByCategory({categoryName:category.categoryName})"> {{category.categoryName}} </a>
        </div>
    </div>
   `,
    controller:function (CategoryService) {
        this.updateCategories = function () {
            CategoryService.getAllCategories().then(data=>{
                this.categories=data.data.categories;
            });
        }
        this.updateCategories();
    },
    controllerAs:'side'
})