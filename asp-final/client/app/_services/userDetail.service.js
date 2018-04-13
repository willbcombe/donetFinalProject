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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var app_config_1 = require("../app.config");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var UserDetailService = /** @class */ (function () {
    function UserDetailService(http, config) {
        this.http = http;
        this.config = config;
        this.site = "http://localhost:5000/api/Detail/";
    }
    UserDetailService.prototype.getById = function (id) {
        return this.http.get(this.config.apiUrl + '/detail/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    UserDetailService.prototype.getList = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.site)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UserDetailService.prototype.getItem = function (itemId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var dataUrl = this.site + itemId;
        return this.http.get(dataUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UserDetailService.prototype.create = function (git, linked, description, user) {
        return this.http.post(this.config.apiUrl + '/detail', user);
    };
    // POST 
    UserDetailService.prototype.createItem = function (git, linked, description, user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.site;
        var params = new http_2.URLSearchParams();
        var content = new http_2.URLSearchParams();
        content.set('GitHub', git);
        content.set('LinkedIn', linked);
        content.set('Description', description);
        content.set('Id', user.Id.toString());
        return this.http.post(url, content.toString(), options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /////////////////////////// hmmm maytbe junk
    UserDetailService.prototype.update = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.site + user.Id + "update";
        var UserDetail = {
            "Id": user["Id"],
            "LinkedIn": user["LinkedIn"],
            "GitHub": user["GitHub"],
            "Description": user["Description"],
            "User": user["User"],
        };
        return this.http.post(url, UserDetail, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    // Retreival of JSON from .NET is a success.
    UserDetailService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    // An error occurred. Notify the user.
    UserDetailService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Observable_1.Observable.throw(errMsg);
    };
    // Edit (PUT) 
    UserDetailService.prototype.editItem = function (editItemId, editGit, editLinked, editDescription) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.site + "MyEdit";
        var params = new http_2.URLSearchParams();
        var content = new http_2.URLSearchParams();
        content.set('GitHub', editGit);
        content.set('Description', editLinked);
        content.set('LinkedIn', editLinked);
        content.set('Id', editItemId.toString());
        return this.http.put(url, content, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    // Delete (delete) 
    UserDetailService.prototype.deleteItem = function (deleteItemID) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        var url = this.site + "MyDelete?Id=" + deleteItemID;
        return this.http.delete(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    // private helper methods
    UserDetailService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    UserDetailService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, app_config_1.AppConfig])
    ], UserDetailService);
    return UserDetailService;
}());
exports.UserDetailService = UserDetailService;
//# sourceMappingURL=userDetail.service.js.map