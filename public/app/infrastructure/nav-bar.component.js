tvzStore.component('navBar', {
    template:`
        <div class="navbar navbar-default">
            <ul class="nav nav-pills">
              <li class="nav-link"><a ui-sref="home">Home</a></li>
              <li class="nav-link"><a ui-sref="register"> Registration</a></li>       
              <li class="nav-link"><a ui-sref="login" ng-show="!c.isLoggedIn">Login</a></li>    
              <li class="nav-link"><a ng-show="c.isLoggedIn">Logout</a></li>
            </ul>
       </div>      
   `,
    controller:function (UserService) {
        this.isLoggedIn = UserService.isLoggedIn();
        this.user = UserService.user;

        this.logout=function () {
            UserService.logout();
            this.isLoggedIn = UserService.isLoggedIn();
        }
    },
    controllerAs:'c'
})