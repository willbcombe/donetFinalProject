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
var feed_service_1 = require("../_services/feed.service");
// This component consumes the re-usable service.
var FeedComponent = /** @class */ (function () {
    // Since using a provider above we can receive service.
    function FeedComponent(_remoteService) {
        this.feedService = _remoteService;
    }
    FeedComponent.prototype.convertToC = function () {
    };
    FeedComponent.prototype.getItems = function () {
        var _this = this;
        this.feedService.getList()
            .subscribe(
        // Success.
        function (data) {
            _this.feeds = data;
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
    FeedComponent.prototype.getItem = function (itemId) {
        var _this = this;
        this.feedService.getItem(itemId)
            .subscribe(
        // Success.
        function (data) {
            _this.Item = data;
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
    FeedComponent.prototype.createToDo = function (newItemName, newdescription, completed) {
        var _this = this;
        this.feedService.createItem(newItemName, newdescription, completed)
            .subscribe(
        // Success.
        function (data) {
            _this.newToDo = data;
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
    FeedComponent.prototype.editToDo = function (editItemId, editItemName, editdescription, editCompleted) {
        var _this = this;
        this.feedService.editItem(editItemId, editItemName, editdescription, editCompleted)
            .subscribe(
        // Success.
        function (data) {
            _this.newToDo = data;
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
    FeedComponent.prototype.deleteToDo = function (deleteItemId) {
        var _this = this;
        this.feedService.deleteItem(deleteItemId)
            .subscribe(
        // Success.
        function (data) {
            _this.newToDo = data;
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
    FeedComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'feed.html',
            // Providers allow us to inject an object instance through the constructor.
            providers: [feed_service_1.FeedService]
        }),
        __metadata("design:paramtypes", [feed_service_1.FeedService])
    ], FeedComponent);
    return FeedComponent;
}());
exports.FeedComponent = FeedComponent;
//# sourceMappingURL=feed.component.js.map