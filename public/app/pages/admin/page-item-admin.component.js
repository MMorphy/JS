tvzStore.component('itemAdministration',{
    templateUrl:'./pages/admin/page-item-admin.template.html',
    controller:function ($scope, ItemService) {
        ItemService.getAllItems().then(data => {
            $scope.items=data.data.items;
            console.log($scope.items[0])
        })
    },
    controllerAs:'c'
})