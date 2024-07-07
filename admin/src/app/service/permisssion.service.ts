import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PermisssionService {
  http = inject(HttpClient);

  addAndUpdate(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/permission`, body);
  }

  getPermissions(page: number, limit: number, sort: string, search: string): Observable<any> {
    const body = { page, limit, sort, search, };
    return this.http.post<any>(`${environment.apiUrl}/permission/get`, body);
  }

  findAllByUserId(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/permission/findAllByUserId`);
  }

  deletePermissions(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/permission/${id}`);
  }
}
