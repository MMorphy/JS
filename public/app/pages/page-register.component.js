tvzStore.component('register',{
    templateUrl:'./pages/page-register.template.html',
    controller:function ($scope, UserService) {
        this.isAdmin = UserService.isAdmin;
        this.onSubmit = function (event, values) {
            this.message = '';
            console.log(values);
            if (this.data.password != this.data.confirmPassword)
            {
                event.preventDefault();
                this.message = 'Passwords don\'t match';
            }
            else
            {
                let user = {
                    username: this.data.username,
                    password: this.data.password
                };
                console.log("U komponenti:" + JSON.stringify(user));
                UserService.register(user);
            }
            $scope.$on('invalidRegister', (e,d) =>{
                console.log("Error on registration");
            })
        }
    },
    controllerAs:'c'
})