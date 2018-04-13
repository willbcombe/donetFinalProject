
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { AlertService, RoleService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'role.html'
})

export class RoleComponent implements OnInit {
    model: any = {};
    loading = false;

        currentUser: User;
        users: User[] = [];
    
        constructor(private userService: UserService, private roleService: RoleService, private alertService: AlertService, private router: Router) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    
        ngOnInit() {

            this.loadUser();
        }
    
        deleteUser(id: number) {
          //  this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
        }
    
        private loadUser() {
            this.userService.getById(this.currentUser.Id).subscribe(users => { this.users = users; });
        }
    create() {
        this.loading = true;
        this.roleService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Creation successful', true);
         //           this.router.navigate(['']);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
}
