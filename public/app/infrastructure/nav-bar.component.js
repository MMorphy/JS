tvzStore.component('navBar', {
    template:`
        <div class="navbar navbar-default">
            <ul class="nav nav-pills">
              <li class="nav-link"><a ui-sref="home">Home</a></li>
              <li class="nav-link"><a ui-sref="register" ng-show="!c.isLoggedIn"> Registration</a></li>       
              <li class="nav-link"><a ui-sref="login" ng-show="!c.isLoggedIn">Login</a></li>    
              <li class="nav-link"><a ng-show="c.isLoggedIn" ng-click="c.logout()">Logout</a></li>
              <li class="nav-link"><a ui-sref="admin" ng-show="c.isAdmin">Administration</li>
            </ul>
       </div>      
   `,
    controller:function (UserService) {
        this.isLoggedIn = UserService.isLoggedIn();
        this.user = UserService.user;
        this.isAdmin = false;
        this.$doCheck = () => {
            this.isLoggedIn = UserService.isLoggedIn();
            if (this.isLoggedIn) {
                this.user = UserService.user;
                if (this.user.admin == 1) {
                    this.isAdmin = true;
                }
                else {
                    this.isAdmin + false;
                }
            }
        }
        this.logout=function () {
            UserService.logout();
            this.isLoggedIn = false;
            this.isAdmin = false;
        }
    },
    controllerAs:'c'
})