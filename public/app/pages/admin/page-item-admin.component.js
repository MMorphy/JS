tvzStore.component('itemAdministration',{
    templateUrl:'./pages/admin/page-item-admin.template.html',
    controller:function ($rootScope, ItemService, CategoryService) {
        //helper and init functions
        this.updateItemsAndCategories = function(){
            ItemService.getAllItems().then(data => {
                this.items=data.data.items;
            });
            CategoryService.getAllCategories().then(data=>{
                this.categories=data.data.categories;
            });
        };
        $rootScope.$on('categoryChange', function (event) {
            console.log(event);
            console.log(this);
            itemContr.updateItemsAndCategories();
        });
        this.findItemById = function(i){
            return this.items.find(item=>item.id==i);
        };
        this.updateItemsAndCategories();
        //editing
        this.editId=-1;
        this.setEdit = function(i){
            this.editId=i;
        };
        this.confirmEdit = function(i, newId){
            let newCategory = this.categories.find(category=> category.categoryId==newId);
            let oldItem = this.findItemById(i);
            let updatedItem={
                id:oldItem.id,
                name:oldItem.name,
                price:oldItem.price,
                available:oldItem.available,
                category_id:newCategory.categoryId
            };
            console.log(updatedItem)
            this.editId=-1;
            ItemService.updateItem(updatedItem).then(data=>{
                console.log(data);
                if(data.status==200){
                    this.updateItemsAndCategories();
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