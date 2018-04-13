import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { User, Role } from '../_models/index';


@Injectable()
export class RoleService {
    constructor(private http: Http, private config: AppConfig) { }

  /*  getAll() {
        return this.http.get(this.config.apiUrl + '/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + '/users/' + id, this.jwt()).map((response: Response) => response.json());
    }*/

    create(role: Role) {
        return this.http.post(this.config.apiUrl + '/role', role, this.jwt());
    }

   // update(user: User) {
   //     return this.http.put(this.config.apiUrl + '/users/' + user.id, user, this.jwt());
    //}
     updateDetail(user: User) {
        return this.http.put(this.config.apiUrl + '/users/' + user.Id, user, this.jwt());
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