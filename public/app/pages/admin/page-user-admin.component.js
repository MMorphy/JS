tvzStore.component('userAdministration',{
    templateUrl:'./pages/admin/page-user-admin.template.html',
    controller:function ($scope, UserService) {
        UserService.getAllUsers().then(data =>{
            this.users=data.data.users;
            console.log(this.users);
        })

        this.deleteUsername="";
        this.findByUsername = function(username){
            return this.users.find(c=> c.username==username);
        }
        this.isAdmin = function(username){
            if (this.findByUsername(username).admin == 1)
                return true;
            else
                return false;
        }
        //Editing
        this.editUsername = "";
        this.setEdit = function(username){
            this.editUsername=username;
        }
        this.confirmEdit = function(username){
            // TODO Logout user and alert him

            this.editUsername="";
            let editedUser = this.findByUsername(username);
            if (editedUser.newAdmin == null && editedUser.password.startsWith("$2b$10$")){
                console.log("No changes to user");
            }
            else{
                let userToUpdate;
                if (editedUser.password.startsWith("$2b$10$")){
                    console
                    userToUpdate = {
                        username: editedUser.username,
                        admin: (editedUser.newAdmin) ? 1 : 0
                    };

                }
                else{
                    userToUpdate = {
                        username: editedUser.username,
                        password: editedUser.password,
                        admin: (editedUser.newAdmin) ? 1 : 0
                    };
                }
                console.log(userToUpdate);
            }
        }

    },
    controllerAs:'userContr'
})