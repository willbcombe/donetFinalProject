import { Component }      from '@angular/core';
import {  FeedService } from '../_services/feed.service';
import { Feed } from '../_models/feed'
// This component consumes the re-usable service.
@Component({
  moduleId: module.id,
    templateUrl: 'feed.html',
    // Providers allow us to inject an object instance through the constructor.
    providers: [FeedService]
})
export class FeedComponent {
    
    feedService: FeedService;
    emailAddress: string;

    // For GET request of list.
    feeds: Array<any>;

    // For single GET request.
    feedSearch:string;
    itemId:string;
    Item:any;

    newItemName:string;
    completed:string;
    deleteItemId:string
    editItemId:number
    editItemName:string
    editCompleted:string
    editdescription: string

    // For newly created object (POST)
    newToDo: any;

    // Since using a provider above we can receive service.
    constructor(_remoteService: FeedService) {
        this.feedService = _remoteService;
    }

    convertToC() {

    }

    getItems() {
        this.feedService.getList()
        // Subscribe to observable.
        .subscribe(
            // Success.
            data => {
                this.feeds = data
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

    getItem(itemId:string) {
        this.feedService.getItem(itemId)
        // Subscribe to observable.
        .subscribe(
            // Success.
            data => {
                this.Item = data
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

    createToDo(newItemName:string, newdescription: string, completed:string) {  

        this.feedService.createItem(newItemName, newdescription, completed)
            // Subscribe to observable.
            .subscribe(

            // Success.
            data => {
                this.newToDo    = data;
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
    editToDo(editItemId:string, editItemName:string, editdescription: string,editCompleted:string) {
        this.feedService.editItem(editItemId, editItemName, editdescription, editCompleted)
            // Subscribe to observable.
            .subscribe(

            // Success.
            data => {
                this.newToDo    = data;
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
    deleteToDo(deleteItemId:string) {
        this.feedService.deleteItem(deleteItemId)
            // Subscribe to observable.
            .subscribe(

            // Success.
            data => {
                this.newToDo    = data;
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
}
