
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, Component, OnInit } from '@angular/core';
import {URLSearchParams, QueryEncoder} from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { User, UserDetail } from '../_models/index';
import { UserService, UserDetailService } from '../_services/index';
import { AlertService, RoleService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'index.html',
    providers: [UserDetailService]
})

export class EditComponent{
    UserDetail: UserDetail;
    model: any = {};
    loading = false;
    service: UserService;
    id: number;
    userDetail: UserDetail;
        currentUser: User;
        users: Array<any>;
        linked: string;
        git: string;
        description: string;
        returnUrl: string;
        userDetailService: UserDetailService;
        emailAddress: string;

        // For GET request of list.
       
    
        // For single GET request.
        detailSearch:string;
        itemId:number;
       userItem: any;
    
        newItemName:string;
        completed:string;
        deleteItemId:string
        editItemId:number
        editGit:string
        editDescription:string
        editLinked: string;
    
    
        // For newly created object (POST)
        newToDo: any;
    
        constructor(private detailService: UserDetailService, private userService: UserService, private roleService: RoleService, private alertService: AlertService, private router: Router,   private route: ActivatedRoute,) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       //     this.model.id = this.currentUser.Id;
      //      this.itemId = this.model.id;
      //      this.model = this.currentUser;
            this.service = userService;
            this.userDetailService = detailService;
      //      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
        }
        getDetails() {
          this.detailService.getList()
          // Subscribe to observable.
          .subscribe(
              // Success.
              data => {
                  this.users = data
              },
              // Error.
              error => {
                  alert(error)
              },
              // Final Instructions.
              () => {
                  console.log("Finished")
              });
      }
      getUser(itemId: number) {
        this.detailService.getItem(itemId)
        // Subscribe to observable.
        .subscribe(
            // Success.
            data => {
                this.userItem = data
            },
            // Error.
            error => {
                alert(error)
            },
            // Final Instructions.
            () => {
                console.log("Finished")
            });
    }
    editToDo( editGit: string, editDescription:string, editLinked: string ) {
      this.editItemId = this.currentUser.Id
      this.detailService.editItem(this.editItemId, editGit,editDescription, editLinked)
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
     
 /*   update(git: string, linked: string, description: string) {
       /* this.git = git;
        this.linked = linked;
        this.description = description;*/
  
  //      this.service.update(this.model)
    //        .subscribe(
      //          data => {
        //            this.model.UserDetail.Description = description;
          //          this.model.UserDetail.GitHub = git;
            //        this.model.UserDetail.LinkedIn = linked;
              //      this.router.navigate(['/profile']);
                //    console.log(data);
                //},
               // error => {
                //    this.alertService.error(error._body);
                 //   this.loading = false;
               /// });
//}*/
}

