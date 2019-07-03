tvzStore.component('categoryAdministration',{
    templateUrl:'./pages/admin/page-category-admin.template.html',
    controller:function ($scope, CategoryService,$scope) {
        //Helper and init functions
        this.updateCategories = function(){
            CategoryService.getAllCategories().then(data=>{
                this.categories=data.data.categories;
            });
        }
        this.findCategoryById = function (id) {
            return this.categories.find(data=>data.categoryId==id);
        }
        this.updateCategories();
        //editing
        this.editId=-1;
        this.setEdit = function(i){
            this.editId=i;
        };
        this.confirmEdit = function (id) {
            this.editId=-1;
            let updatedCategory={
                categoryId:this.findCategoryById(id).categoryId,
                categoryName:this.findCategoryById(id).categoryName
            };
            CategoryService.updateCategory(updatedCategory).then(data =>{
                console.log(data);
                if(data.status==200) {
                    alert('Successful category edit!');
                }
                else
                    alert('Error while editing item');
            });
        }

    },

    controllerAs:'categoryContr'
})