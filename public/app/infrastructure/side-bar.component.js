tvzStore.component('sideBar', {
    // TODO Uljepsaj ovo
    template:`
    <div id="sidebar-wrapper" class="col-lg-3 fixed" style="float: right">
        <ul class="sidebar-nav">
            <li ng-repeat="category in side.categories" > <a ui-sref="itemsByCategory({categoryName:category.categoryName})"> {{category.categoryName}} </a> </li>

        </ul>
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