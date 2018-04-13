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
var EditComponent = /** @class */ (function () {
    function EditComponent(detailService, userService, roleService, alertService, router, route) {
        this.detailService = detailService;
        this.userService = userService;
        this.roleService = roleService;
        this.alertService = alertService;
        this.router = router;
        this.route = route;
        this.model = {};
        this.loading = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //     this.model.id = this.currentUser.Id;
        //      this.itemId = this.model.id;
        //      this.model = this.currentUser;
        this.service = userService;
        this.userDetailService = detailService;
        //      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
    }
    EditComponent.prototype.getDetails = function () {
        var _this = this;
        this.detailService.getList()
            .subscribe(
        // Success.
        function (data) {
            _this.users = data;
        }, 
        // Error.
        function (error) {
            alert(error);
        }, 
        // Final Instructions.
        function () {
            console.log("Finished");
        });
    };
    EditComponent.prototype.getUser = function (itemId) {
        var _this = this;
        this.detailService.getItem(itemId)
            .subscribe(
        // Success.
        function (data) {
            _this.userItem = data;
        }, 
        // Error.
        function (error) {
            alert(error);
        }, 
        // Final Instructions.
        function () {
            console.log("Finished");
        });
    };
    EditComponent.prototype.editToDo = function (editGit, editDescription, editLinked) {
        var _this = this;
        this.editItemId = this.currentUser.Id;
        this.detailService.editItem(this.editItemId, editGit, editDescription, editLinked)
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
    EditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'index.html',
            providers: [index_1.UserDetailService]
        }),
        __metadata("design:paramtypes", [index_1.UserDetailService, index_1.UserService, index_2.RoleService, index_2.AlertService, router_1.Router, router_1.ActivatedRoute])
    ], EditComponent);
    return EditComponent;
}());
exports.EditComponent = EditComponent;
//# sourceMappingURL=editProfile.component.js.map