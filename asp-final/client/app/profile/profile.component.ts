
import {ActivatedRoute, Router } from '@angular/router';
import { Injectable, Component, OnInit } from '@angular/core';
import { concatMap } from 'rxjs/operators/concatMap';
import { User, UserDetail } from '../_models/index';
import { UserService, UserDetailService } from '../_services/index';
import { AlertService, RoleService } from '../_services/index';
import { NgForm } from '@angular/forms';
import {URLSearchParams, QueryEncoder} from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    templateUrl: 'index.html'
})

export class ProfileComponent{
    model: any = {};
    loading = false;
    userDetail: UserDetail;
    id: number;
    currentUser: User;
    git: string;
    linked: string;
    description: string;
    users: User[] = [];
    user: User;
    service: UserService;
    detailService: UserDetailService;
    isUser: boolean;
    newGit: string;
    newLinked: string;
    newdescription: string;
    newItem: any;
        constructor(private userService: UserService,private userdetailService: UserDetailService, private roleService: RoleService, private alertService: AlertService, private router:Router) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          //  this.id = this.currentUser.id;
            this.service = userService;
            this.detailService = userdetailService
            this.id = this.currentUser.Id
          /*  if(this.currentUser.UserDetail==null){

                this.description== " ";
                 this.currentUser.UserDetail.GitHub == " ";
                 this.currentUser.UserDetail.LinkedIn == " ";
            }*/
        }
    
        /*ngOnInit() {
           this.userService.getById(this.currentUser.id).subscribe( 
                data =>
                {
                  this.userDetail = data.userDetail;
                  // Load the current user's data.
                 return this.userService.currentUser(
                    (userData: User) => {
                      this.currentUser = userData;
                       this.isUser = (this.currentUser.id === this.userDetail.Id);
                    });
           });
            
        }*/
    deleteUser() {
            this.service.delete(this.id).subscribe(() => { this.loadAllUsers() });
        }
    
        private loadAllUsers() {
            this.service.getAll().subscribe(users => { this.users = users; });
        }
    create(newGit: string, newLinked: string, newDescription: string) {
        this.loading = true;
        var user = this.currentUser;
        this.detailService.createItem(newGit, newLinked, newDescription, user)
        
            .subscribe(
                data => {
                    this.alertService.success('Creation successful', true);
                    this.router.navigate(['']);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
    editDetail(git: string, description: string, linked: string) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.id = this.currentUser.Id
        this.detailService.editItem(this.id, git,description, linked)
        this.service.update(this.currentUser)
            // Subscribe to observable.
            .subscribe(
  
            // Success.
            data => {
                this.model    = data;
                console.log(data)
            },
            // Error.
            error => {
                alert(error)
            },
            // Final instructions.
            () => {
                console.log("Finished")
            });
    }
       
    update( git: string, linked: string, description: string) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       this.model = this.currentUser;

      // this.userDetail.Id = this.model.UserDetail.id
     //         this.model.userDetail.GitHub = git;
     //         this.model.userDetail.LinkedIn = linked;
     //        this.model.userDetail.Description = description;
    
   //      this.model.UserDetail = this.userDetail;
    //    this.user = this.model;
    this.currentUser.UserDetail.Id = this.model.UserDetail.Id;
        this.currentUser= this.model;
         this.service.updateDetail(this.currentUser)
             .subscribe(
                 data => {
                    this.userDetail = data.userDetail;
                    // Load the current user's data.
                   return this.userService.currentUser.userDetail(
                      (userData: User) => {
                        this.currentUser = userData;
                        this.isUser = (this.currentUser.Id === this.userDetail.Id);
                     });
                });
                    this.alertService.success('Creation successful', true);

                //     this.router.navigate(['/profile'])
    }   
}
