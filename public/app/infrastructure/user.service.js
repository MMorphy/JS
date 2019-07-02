class UserService {

    constructor($http,$rootScope,ApiInterface,$state){
        this.user = null;
        this.loginUrl='/api/login';
        this.registerUrl='/api/register';
        this.rootScope=$rootScope;
        this.api=ApiInterface;
        this.state=$state;
    }

    login(user){
        this.api.doPost(this.loginUrl,{user:user}).then(r => {
            if (r.data.status==100){
                this.user=r.data.user;
                sessionStorage.setItem('auth',true);
                sessionStorage.setItem('loggedUser', JSON.stringify(this.user));
                this.state.go('home');
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
        this.api.doPost(this.registerUrl, {data:user}).then(r => {
            if (r.data.status == 100) {
                this.rootScope.$broadcast('invalidRegister', r.data.message);
                this.state.go('register');
            } else if (r.data.status == 200) {
                this.rootScope.$broadcast('validRegister');
                this.state.go('login');
            }
        });
    }
    isLoggedIn(){
        if ((sessionStorage.getItem('auth')) || this.user != null)
        {
            this.user = JSON.stringify(sessionStorage.getItem('loggedUser'));
            return true;
        }
        else
        {
            return false;
        }
    }
    isAdmin(){
        console.log(this.user.admin);
    }

}
tvzStore.service('UserService', UserService);