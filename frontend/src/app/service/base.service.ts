import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { _id: string }> {

  private readonly apiUrl: string = 'http://localhost:3000/';
  entity: string = '';

  constructor(
    public http: HttpClient
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.entity}`);
  }

  getOne(_id: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${this.entity}/${_id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${this.entity}`, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${this.entity}/${entity._id}`, entity);
  }

  delete(_id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${this.entity}/${_id}`);
  }
}
