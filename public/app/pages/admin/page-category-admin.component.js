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

        //deleting
        this.deleteId=-1;
        this.setDelete = function(i){
            console.log(i);
            this.deleteId=i;
        };
        this.confirmDelete = function(i){
            this.deleteId=-1;
            CategoryService.deleteCategory(i).then(data=>{
                if (data.status==200){
                    this.updateCategories();
                    alert('Successful item deletion!')
                }
                else{
                    alert('Error while deleting item!')
                }
            });
        };

        //adding
        this.add=false;
        this.isAdding = function() {
            return this.add;
        };
        this.flipAddCategory = function () {
            if (this.add == false){
                this.add = true;
            }
            else{
                this.add = false;
            }
        };
        this.addCategory = function(){
            console.log(this.new);
            CategoryService.createCategory(this.new).then(data =>{
                if (data.status==200) {
                    this.updateCategories();
                    this.flipAddCategory();
                    alert("Successful category added!")
                }
                else{
                    alert("Error while adding category!")
                    this.flipAddCategory();
                }
            });
        }
    },

    controllerAs:'categoryContr'
})