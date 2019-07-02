class UserService {

    constructor($http,$rootScope){
        this.http=$http;
        this.allItemsUrl='/api/login';
        this.registerUrl='/api/register';
        this.rootScope=$rootScope;
    }



}
tvzStore.service('UserService', UserService);