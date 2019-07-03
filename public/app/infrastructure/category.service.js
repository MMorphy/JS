class CategoryService {

    constructor($http,$rootScope){
        this.http=$http;
        this.allCategoriesUrl='/api/categories';
        this.rootScope=$rootScope;
    }

    getAllCategories(){
        return this.http.get(this.allCategoriesUrl);
    }

}
tvzStore.service('CategoryService', CategoryService);