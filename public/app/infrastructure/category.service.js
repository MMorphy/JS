class CategoryService {

    constructor($http){
        this.http=$http;
        this.allCategoriesUrl='/api/categories';
    }

    getAllCategories(){
        return this.http.get(this.allCategoriesUrl);
    }
    deleteCategory(id){
        return this.http.delete(this.allCategoriesUrl+'/'+id);
    }
    updateCategory(category){
        return this.http.put(this.allCategoriesUrl,{data:category});
    }
    createCategory(category){
        return this.http.post(this.allCategoriesUrl,{data:category});
    }
}
tvzStore.service('CategoryService', CategoryService);