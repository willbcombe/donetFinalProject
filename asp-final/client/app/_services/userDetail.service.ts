import { Injectable, Component } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {URLSearchParams, QueryEncoder} from '@angular/http';
import { AppConfig } from '../app.config';
import { User, UserDetail } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class UserDetailService {
    public site:string;
    constructor(private http: Http, private config: AppConfig) { 
            this.site = "http://localhost:5000/api/Detail/"
    }
    
   


    getById(id: number) {
        return this.http.get(this.config.apiUrl + '/detail/' + id, this.jwt()).map((response: Response) => response.json());
    }
    getList(): Observable<string[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        return this.http.get(this.site)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getItem(itemId: number): Observable<string[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let dataUrl = this.site + itemId;  
        return this.http.get(dataUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    create(git: string, linked: string, description: string, user: User) {
        return this.http.post(this.config.apiUrl + '/detail', user);
    }
    
    // POST 
    createItem(git: string,linked: string, description:string, user: User): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); 
        let options = new RequestOptions({ headers: headers });
        let url     = this.site;

        let params: URLSearchParams = new URLSearchParams();

        let content = new URLSearchParams();
        content.set('GitHub',  git);
        content.set('LinkedIn', linked); 
        content.set('Description', description);
        content.set('Id', user.Id.toString()); 
        
        return this.http.post(url, content.toString(), options)
            .map(this.extractData) 
            .catch(this.handleError); 
    } 
    /////////////////////////// hmmm maytbe junk
    update(user: UserDetail) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let url     = this.site + user.Id + "update";

        let UserDetail = {
            "Id": user["Id"],
            "LinkedIn": user["LinkedIn"],
            "GitHub": user["GitHub"],
            "Description": user["Description"],
            "User": user["User"],
            
        }
        return this.http.post(url, UserDetail, options)
            .map(this.extractData) 
            .catch(this.handleError); 
    } 
    
    // Retreival of JSON from .NET is a success.
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    // An error occurred. Notify the user.
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }
    // Edit (PUT) 
    editItem(editItemId:number, editGit:string, editLinked:string, editDescription:string): Observable<Comment[]> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); 
        let options = new RequestOptions({ headers: headers });
        let url     = this.site + "MyEdit";

        let params: URLSearchParams = new URLSearchParams();

        let content = new URLSearchParams();
        content.set('GitHub',  editGit);
        content.set('Description', editLinked);  
        content.set('LinkedIn', editLinked);  
        content.set('Id', editItemId.toString())
        
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


    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}