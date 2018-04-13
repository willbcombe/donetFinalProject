import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { User, UserDetail } from '../_models/index';
//import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';

@Injectable()
export class UserService {
    //private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    constructor(private http: Http, private config: AppConfig) { }

    getAll() {
        return this.http.get(this.config.apiUrl + '/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + '/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.config.apiUrl + '/users', user, this.jwt());
    }

    update(user: User) {
        return this.http.put(this.config.apiUrl + '/users/' + user.Id, user, this.jwt());
    }
    updateDetail(user: User) {
        return this.http.put(this.config.apiUrl + '/users'+/* + user.id +*/ '/UpdateDetail', user, this.jwt()).map((response: Response) => response.json());
    }
    
    delete(id: number) {
        return this.http.delete(this.config.apiUrl + '/users/' + id, this.jwt());
    }
    populate() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // If JWT detected, attempt to get & store user's info
        if (currentUser.getToken()) {
          this.getById(currentUser.Id)
          .subscribe(
            data => this.getById(data.user.Id),
         //   err => this.purgeAuth()
          );
        } else {
          // Remove any potential remnants of previous auth states
         // this.purgeAuth();
        }
      }
      getCurrentUser(): User {
        return this.currentUser.value;
      }
    
      // Update the user on the server (email, pass, etc)
   /*   update(user: User){
        return this.http.put(this.config.apiUrl + '/users/' + user.id, {user}, this.jwt()).subscribe(data => {
          // Update the currentUser observable
          this.currentUserSubject.next(user);
          return user;
        });
      }*/

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