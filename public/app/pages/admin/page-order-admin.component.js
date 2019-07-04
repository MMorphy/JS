tvzStore.component('orderAdministration',{
    templateUrl:'./pages/admin/page-order-admin.template.html',
    controller:function ($scope, OrderService, ItemService) {
        //Util and init
        this.$onInit = function () {
            this.updateOrders();
            this.updateItems();
        }
        this.updateOrders=function () {
            OrderService.getAllOrders().then(data=>{
                this.orders=data.data.orders;
                console.log(this.orders);
            })
        };
        this.updateItems=function () {
            ItemService.getAllItems().then(data => {
                console.log(data.data.items);
                this.items=data.data.items;
            });
        }
        this.findOrderById=function (id) {
            return this.orders.find(o=>o.id==id);
        };
        this.updateItems();
        $scope.findItemById=function (id) {
            this.items.find(i=>i.id==id);
        }
        this.isFinished=function (id) {
            if (this.findOrderById(id).finished == 0)
                return false;
            else
                return true;
        };
        this.formatDateTime = function (string) {
            return string.replace(/[a-zA-Z]/g, ' ');
        }
        this.updateOrders();

        //editing
        this.editId=-1;
        this.setEdit = function (id){
            this.editId=id;
            console.log(this.items);
        };
        this.confirmEdit = function (id) {
            this.editId=-1;
            let finishedOrder = this.findOrderById(id);
            if (finishedOrder.finished==0){
                finishedOrder.finished=1;
                finishedOrder.deliveryTime = this.formatDateTime(finishedOrder.deliveryTime);
                console.log(finishedOrder.deliveryTime);
                OrderService.updateOrder(finishedOrder).then(data=>{
                    if (data.status == 200){
                        alert("Order successfully finished!")
                    }
                    else
                        alert("Error while finishing order!")
                });
            }

        };

        //deleting
        this.deleteId=-1
        this.setDelete = function (id){
            this.deleteId=id;
        };
        this.confirmDelete=function (id) {
            this.deleteId=-1;
            OrderService.deleteOrder(id).then(data=>{
                if (data.status==200){
                    this.updateOrders();
                    alert('Successful order deletion!')
                }
                else{
                    alert('Error while deleting order!')
                }
            });
        };
    },
    controllerAs:'c'
})