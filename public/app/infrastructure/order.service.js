class OrderService {

    constructor($http,$rootScope){
        this.http=$http;
        this.ordersUrl='/api/orders';
    }

    getAllItems(){
        return this.http.get(this.ordersUrl);
    }
    deleteItem(id){
        return this.http.delete(this.ordersUrl+'/'+id);
    }
    updateItem(order){
        return this.http.put(this.ordersUrl,{data:order});
    }
    createItem(order){
        return this.http.post(this.ordersUrl,{data:order});
    }
}
tvzStore.service('OrderService', OrderService);