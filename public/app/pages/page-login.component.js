tvzStore.component('login',{
    templateUrl:'./pages/page-login.template.html',
    controller:function ($scope, UserService) {
        let message = "";
        this.onSubmit = function (data, event) {
            console.log(data);
            if (!data.username.length > 0 || !data.password.length > 0) {
                message = "Invalid please enter username and password";
            } else {
                let user = {
                    "username": data.username,
                    password: data.password
                }
                UserService.login(user);
                $scope.$on('invalidLogin', (e, d) => {
                    console.log("Invalid login");
                })
            }
        }
    },
    controllerAs:'c'
})