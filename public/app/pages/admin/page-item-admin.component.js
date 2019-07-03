tvzStore.component('itemAdministration',{
    templateUrl:'./pages/admin/page-item-admin.template.html',
    controller:function ($scope, ItemService, CategoryService) {
        ItemService.getAllItems().then(data => {
            this.items=data.data.items;
        });
        CategoryService.getAllCategories().then(data=>{
            this.categories=data.data.categories;
        });

        //editing
        this.editId=-1;
        this.setEdit = function(i){
            this.editId=i;
        };
        this.confirmEdit = function(i, newId){
            let newCategory = this.categories.find(category=> category.categoryId==newId);
            let updatedItem={
                id:this.items[i-1].id,
                name:this.items[i-1].name,
                price:this.items[i-1].price,
                available:this.items[i-1].available,
                category_id:newCategory.categoryId
            };
            console.log(updatedItem)
            this.editId=-1;
            ItemService.updateItem(updatedItem).then(data=>{
                console.log(data)
                if(data.status==200){
                    this.items[i-1].categoryName=newCategory.categoryName;
                    this.items[i-1].category_id=newCategory.categoryId;
                    alert('Successful item edit!')
                }
                else{
                    alert('Error while editing item!')
                }
            })
        };

        //deleting
        this.deleteId=-1;
        this.setDelete = function(i){
            console.log(i);
            this.deleteId=i;
        };
        this.confirmDelete = function(i){
            this.deleteId=-1;
            ItemService.deleteItem(i).then(data=>{
                if (data.status==200){
                    this.items.splice(this.items.findIndex(c => c.id == i),1);
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
        this.flipAddItem = function () {
            if (this.add == false){
                this.add = true;
            }
            else{
                this.add = false;
            }
        };
        this.addItem = function(){
            ItemService.createItem(this.new).then(data =>{
                ItemService.getAllItems().then(data => {
                    this.items=data.data.items;
                });
            });
        }
    },
    controllerAs:'itemContr'
})