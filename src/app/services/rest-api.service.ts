import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Friend} from './friend';
import {Observable} from 'rxjs';
import {Classe} from './classe';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  apiUrlClient = 'http://localhost:8081/friends';
  apiUrlClient2 = 'http://localhost:8081/classes';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  }

  constructor(private http: HttpClient) { }

  getFriend() {
    return this.http.get<Friend[]>(this.apiUrlClient);
  }

  createFriend(friend): Observable<Friend> {
    return this.http.post<Friend>(this.apiUrlClient + '/addnew', JSON.stringify(friend), this.httpOptions);
  }

  updateFriend(id: number, value: any): Observable<any> {
    return this.http.put(`${this.apiUrlClient}/${id}/edit`, value);
  }

  deleteFriend(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlClient}/${id}/delete`, { responseType: 'text' });
  }

  getClasse() {
    return this.http.get<Classe[]>(this.apiUrlClient2);
  }

}
