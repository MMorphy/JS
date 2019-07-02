tvzStore.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('home',{
        url:'/',
        component:'home'
    }).state('login',{
        url:'/login',
        component:'login'
    }).state('register',{
        url:'/register',
        component:'register'
    }).state('admin',{
        url:'/admin',
        component:'administration'
    });
    $urlRouterProvider.otherwise('/');
})