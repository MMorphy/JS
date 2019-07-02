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
    });
    $urlRouterProvider.otherwise('/');
})