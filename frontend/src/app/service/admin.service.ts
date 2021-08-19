import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../model/admin';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService<Admin> {

  constructor(
    public http: HttpClient,
  ) {
    super(http);
    this.entity = 'admins';
  }

  findByEmail(email: string, token: string, sessionId: string): Observable<Admin> {
    const url = `${this.apiUrl}/${this.entity}/email=${email}`;
    return this.http.get<Admin>(url, { 'headers': { 'Authorization': `Bearer ${token}`, 'sessionId': sessionId } });
  }
}
