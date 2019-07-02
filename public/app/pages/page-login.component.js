tvzStore.component('login',{
    templateUrl:'./pages/page-login.template.html',
    controller:function ($scope, UserService, $state) {
        this.message = "";
        this.onSubmit = function (data, event) {
            if (!data.username.$viewValue.length > 0 || !data.password.$viewValue.length > 0) {
                message = "Invalid please enter username and password";
            } else {
                let user = {
                    username: data.username.$viewValue,
                    password: data.password.$viewValue
                }
                UserService.login(user);
                $scope.$on('invalidLogin', (e, d) => {
                    console.log("Invalid login");
                    this.message="Invalid login. Please check username/password"
                });
                $scope.$on('validLogin', (e,d) => {
                    console.log("Valid login");
                    $state.transitionTo('home');
                    message="";

                })
            }
        }
    },
    controllerAs:'c'
})