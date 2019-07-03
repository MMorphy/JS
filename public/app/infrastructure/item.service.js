class ItemService {

    constructor($http,$rootScope){
        this.http=$http;
        this.itemsUrl='/api/items';
    }

    getAllItems(){
        return this.http.get(this.itemsUrl);
    }
    deleteItem(id){
        return this.http.delete(this.itemsUrl+'/'+id);
    }
    updateItem(item){
        return this.http.put(this.itemsUrl,{data:item});
    }
    createItem(item){
        return this.http.post(this.itemsUrl,{data:item});
    }
}
tvzStore.service('ItemService', ItemService);