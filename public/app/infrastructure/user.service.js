class UserService {

    constructor($http,$rootScope,$state){
        this.user = null;
        this.http = $http;
        this.rootScope=$rootScope;
        this.state=$state;
        //URLs
        this.loginUrl='/api/login';
        this.registerUrl='/api/register';
        this.getUsersUrl='/api/users';
    }

    login(user){
        this.http.post(this.loginUrl,{data:user}).then(r => {
            if (r.data.status==100){
                console.log(r.data.user);
                this.user=r.data.user;
                sessionStorage.setItem('auth',true);
                sessionStorage.setItem('loggedUser', JSON.stringify(this.user));
                this.rootScope.$broadcast('validLogin');
            }
            else{
                this.rootScope.$broadcast('invalidLogin', r.data.message);
            }
        });
    }
    logout(){
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('loggedUser');
        this.user=null;
        this.rootScope.$broadcast('logout');
        this.state.go('home');
    }
    register(user) {
        console.log("User service: " + user)
        this.http.post(this.registerUrl, {data:user}).then(r => {
            if (r.data.status == 100) {
                this.rootScope.$broadcast('invalidRegister', r.data.message);
            } else if (r.data.status == 200) {
                this.rootScope.$broadcast('validRegister');
                this.state.go('login');
            }
        });
    }
    isLoggedIn(){
        if (sessionStorage.length == 2)
        {
            this.user = JSON.parse(sessionStorage.getItem('loggedUser'));
            return true;
        }
        else
        {
            return false;
        }
    }
    getUsers(){
        this.http.get('/api/users');
    }
}
tvzStore.service('UserService', UserService);