import { Injectable }     from '@angular/core';
import { Component }      from '@angular/core';
import {URLSearchParams, QueryEncoder} from '@angular/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 

@Injectable()
export class FeedService {
    public site:string;
    constructor(private http: Http) { 
       this.site = "http://localhost:5000/api/Feed/"
    }

    // GET temperature in Celsius.
    getList(): Observable<string[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        return this.http.get(this.site)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // GET single item.
    getItem(itemId:string): Observable<string[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let dataUrl = this.site + itemId;  
        return this.http.get(dataUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }


    // POST 
    createItem(name:string,  editdescription: string, completed:string): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); 
        let options = new RequestOptions({ headers: headers });
        let url     = this.site;

        let params: URLSearchParams = new URLSearchParams();

        let content = new URLSearchParams();
        content.set('IsComplete',  completed);
        content.set('Name', name);  
        content.set('Description', editdescription);
        
        return this.http.post(url, content.toString(), options)
            .map(this.extractData) 
            .catch(this.handleError); 
    } 

    // Edit (PUT) 
    editItem(editItemId:string, editItemName:string, editdescription: string, editCompleted:string): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); 
        let options = new RequestOptions({ headers: headers });
        let url     = this.site + "MyEdit";

        let params: URLSearchParams = new URLSearchParams();

        let content = new URLSearchParams();
        content.set('IsComplete',  editCompleted);
        content.set('Name', editItemName);  
        content.set('Id', editItemId)
        content.set('Description', editdescription);
        
        return this.http.put(url, content, options)
            .map(this.extractData) 
            .catch(this.handleError); 
    } 

    // Delete (delete) 
    deleteItem(deleteItemID:string): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); 
        let options = new RequestOptions({ headers: headers });
        let url     = this.site + "MyDelete?Id=" + deleteItemID;

        return this.http.delete(url)
            .map(this.extractData) 
            .catch(this.handleError); 
    } 

    // Retreival of JSON from .NET is a success.
    private extractData(res: Response) {
        let body = res.json();
        return body;
       // return JSON.parse(body) || {};
    }

    // An error occurred. Notify the user.
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }
}