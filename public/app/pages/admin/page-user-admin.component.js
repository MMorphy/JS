tvzStore.component('userAdministration',{
    templateUrl:'./pages/admin/page-user-admin.template.html',
    controller:function ($scope, UserService) {
        UserService.getAllUsers().then(data =>{
            this.users=data.data.users;
        });

        this.findByUsername = function(username){
            return this.users.find(c=> c.username==username);
        }
        this.isAdmin = function(username){
            if (this.findByUsername(username).admin == 1)
                return true;
            else
                return false;
        }
        this.updateUserList = function () {
            UserService.getAllUsers().then(data =>{
                this.users=data.data.users;
            });
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
            console.log(editedUser.newAdmin);
            if (editedUser.newAdmin == null && editedUser.password.startsWith("$2b$10$")){
                console.log("No changes to user");
            }
            else{
                let userToUpdate;
                if (editedUser.newAdmin != null && editedUser.password.startsWith("$2b$10$")){
                    console.log("Changed admin");
                    console.log(editedUser.newAdmin);
                    if (editedUser.newAdmin == true)
                        userToUpdate = {
                            username: editedUser.username,
                            admin: 1
                        };
                    else
                        userToUpdate = {
                            username: editedUser.username,
                            admin: 0
                        };
                    console.log(userToUpdate);
                }
                else if(editedUser.newAdmin == null && editedUser.password.startsWith("$2b$10$")){
                    console.log("Changed password");
                    userToUpdate = {
                        username: editedUser.username,
                        password: editedUser.password,
                    };
                }
                else{
                    console.log("Changed password and admin");
                    userToUpdate = {
                        username: editedUser.username,
                        password: editedUser.password,
                        admin: (editedUser.newAdmin) ? 1 : 0
                    };
                }
                UserService.updateUser(userToUpdate).then(data=>{
                    if (data.status==200){
                        alert('Successful user edit!')
                        this.updateUserList();
                    }
                    else{
                        alert('Error while editing user!')
                    }
                });
            }
        }

        //Deleting
        this.deleteUsername="";
        this.setDelete = function (username) {
            this.deleteUsername = username;
        }
        this.confirmDelete = function (username) {
            this.deleteUsername = "";
            UserService.deleteUser(username).then(data=>{
                if (data.status==200){
                    alert('Successful user deletion!')
                    this.updateUserList();
                }
                else{
                    alert('Error while deleting user!')
                }
            });
        }

    },
    controllerAs:'userContr'
})