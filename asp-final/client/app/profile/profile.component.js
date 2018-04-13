"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var index_1 = require("../_services/index");
var index_2 = require("../_services/index");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(userService, userdetailService, roleService, alertService, router) {
        this.userService = userService;
        this.userdetailService = userdetailService;
        this.roleService = roleService;
        this.alertService = alertService;
        this.router = router;
        this.model = {};
        this.loading = false;
        this.users = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //  this.id = this.currentUser.id;
        this.service = userService;
        this.detailService = userdetailService;
        this.id = this.currentUser.Id;
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
    ProfileComponent.prototype.deleteUser = function () {
        var _this = this;
        this.service.delete(this.id).subscribe(function () { _this.loadAllUsers(); });
    };
    ProfileComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.service.getAll().subscribe(function (users) { _this.users = users; });
    };
    ProfileComponent.prototype.create = function (newGit, newLinked, newDescription) {
        var _this = this;
        this.loading = true;
        var user = this.currentUser;
        this.detailService.createItem(newGit, newLinked, newDescription, user)
            .subscribe(function (data) {
            _this.alertService.success('Creation successful', true);
            _this.router.navigate(['']);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
    };
    ProfileComponent.prototype.editDetail = function (git, description, linked) {
        var _this = this;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.id = this.currentUser.Id;
        this.detailService.editItem(this.id, git, description, linked);
        this.service.update(this.currentUser)
            .subscribe(
        // Success.
        function (data) {
            _this.model = data;
            console.log(data);
        }, 
        // Error.
        function (error) {
            alert(error);
        }, 
        // Final instructions.
        function () {
            console.log("Finished");
        });
    };
    ProfileComponent.prototype.update = function (git, linked, description) {
        var _this = this;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.model = this.currentUser;
        // this.userDetail.Id = this.model.UserDetail.id
        //         this.model.userDetail.GitHub = git;
        //         this.model.userDetail.LinkedIn = linked;
        //        this.model.userDetail.Description = description;
        //      this.model.UserDetail = this.userDetail;
        //    this.user = this.model;
        this.currentUser.UserDetail.Id = this.model.UserDetail.Id;
        this.currentUser = this.model;
        this.service.updateDetail(this.currentUser)
            .subscribe(function (data) {
            _this.userDetail = data.userDetail;
            // Load the current user's data.
            return _this.userService.currentUser.userDetail(function (userData) {
                _this.currentUser = userData;
                _this.isUser = (_this.currentUser.Id === _this.userDetail.Id);
            });
        });
        this.alertService.success('Creation successful', true);
        //     this.router.navigate(['/profile'])
    };
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'index.html'
        }),
        __metadata("design:paramtypes", [index_1.UserService, index_1.UserDetailService, index_2.RoleService, index_2.AlertService, router_1.Router])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map