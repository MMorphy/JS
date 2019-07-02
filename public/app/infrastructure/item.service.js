class ItemService {

    constructor($http,$rootScope){
        this.http=$http;
        this.allItemsUrl='/api/items';
        this.registerUrl='/api/register';
        this.rootScope=$rootScope;
    }

    getAllItems(){
        return this.http.get(this.allItemsUrl);
    }

}
tvzStore.service('ItemService', ItemService);