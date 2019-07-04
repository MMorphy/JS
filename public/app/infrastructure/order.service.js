class OrderService {

    constructor($http,$rootScope){
        this.http=$http;
        this.ordersUrl='/api/orders';
    }

    getAllOrders(){
        return this.http.get(this.ordersUrl);
    }
    deleteOrder(id){
        return this.http.delete(this.ordersUrl+'/'+id);
    }
    updateOrder(order){
        return this.http.put(this.ordersUrl,{data:order});
    }
    createOrder(order){
        return this.http.post(this.ordersUrl,{data:order});
    }
}
tvzStore.service('OrderService', OrderService);