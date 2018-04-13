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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var FeedService = /** @class */ (function () {
    function FeedService(http) {
        this.http = http;
        this.site = "http://localhost:5000/api/Feed/";
    }
    // GET temperature in Celsius.
    FeedService.prototype.getList = function () {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        return this.http.get(this.site)
            .map(this.extractData)
            .catch(this.handleError);
    };
    // GET single item.
    FeedService.prototype.getItem = function (itemId) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var dataUrl = this.site + itemId;
        return this.http.get(dataUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    // POST 
    FeedService.prototype.createItem = function (name, editdescription, completed) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var url = this.site;
        var params = new http_1.URLSearchParams();
        var content = new http_1.URLSearchParams();
        content.set('IsComplete', completed);
        content.set('Name', name);
        content.set('Description', editdescription);
        return this.http.post(url, content.toString(), options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    // Edit (PUT) 
    FeedService.prototype.editItem = function (editItemId, editItemName, editdescription, editCompleted) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var url = this.site + "MyEdit";
        var params = new http_1.URLSearchParams();
        var content = new http_1.URLSearchParams();
        content.set('IsComplete', editCompleted);
        content.set('Name', editItemName);
        content.set('Id', editItemId);
        content.set('Description', editdescription);
        return this.http.put(url, content, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    // Delete (delete) 
    FeedService.prototype.deleteItem = function (deleteItemID) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var url = this.site + "MyDelete?Id=" + deleteItemID;
        return this.http.delete(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    // Retreival of JSON from .NET is a success.
    FeedService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
        // return JSON.parse(body) || {};
    };
    // An error occurred. Notify the user.
    FeedService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        return Observable_1.Observable.throw(errMsg);
    };
    FeedService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_2.Http])
    ], FeedService);
    return FeedService;
}());
exports.FeedService = FeedService;
//# sourceMappingURL=feed.service.js.map