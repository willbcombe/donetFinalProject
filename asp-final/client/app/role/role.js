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
var RoleComponent = /** @class */ (function () {
    function RoleComponent(userService, roleService, alertService, router) {
        this.userService = userService;
        this.roleService = roleService;
        this.alertService = alertService;
        this.router = router;
        this.model = {};
        this.loading = false;
        this.users = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    RoleComponent.prototype.ngOnInit = function () {
        this.loadUser();
    };
    RoleComponent.prototype.deleteUser = function (id) {
        //  this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    };
    RoleComponent.prototype.loadUser = function () {
        var _this = this;
        this.userService.getById(this.currentUser.Id).subscribe(function (users) { _this.users = users; });
    };
    RoleComponent.prototype.create = function () {
        var _this = this;
        this.loading = true;
        this.roleService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Creation successful', true);
            //           this.router.navigate(['']);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
    };
    RoleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'role.html'
        }),
        __metadata("design:paramtypes", [index_1.UserService, index_2.RoleService, index_2.AlertService, router_1.Router])
    ], RoleComponent);
    return RoleComponent;
}());
exports.RoleComponent = RoleComponent;
//# sourceMappingURL=role.js.map