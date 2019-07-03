tvzStore.component('navBar', {
    template:`
            <nav class="navbar navbar-default" role="navigation">
              <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-left">
                    <li><a class="nav-link" ui-sref="home">Home</a></li>
                    <li><a class="nav-link" ui-sref="basket">Shopping cart</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a class="nav-link" ui-sref="register" ng-show="!c.isLoggedIn"> Registration</a></li>       
                    <li><a class="nav-link" ui-sref="login" ng-show="!c.isLoggedIn">Login</a></li>    
                    <li><a class="nav-link" ng-show="c.isLoggedIn" ng-click="c.logout()">Logout</a></li>
                    <li><a class="nav-link" ui-sref="admin" ng-show="c.isAdmin">Administration</li>               
                 </ul>
              </div>
            </nav>
   
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