import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { _id: string }> {

  public readonly apiUrl: string = 'http://localhost:3000/api';
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

  update(entity: T, options = {}): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${this.entity}/${entity._id}`, entity, options);
  }

  delete(_id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${this.entity}/${_id}`);
  }
}
