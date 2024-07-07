import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  http = inject(HttpClient);

  addAndUpdate(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/roles`, body);
  }

  getRoles(page: number, limit: number, sort: string, search: string): Observable<any> {
    const body = {page,limit,sort,search}
    return this.http.post<any>(`${environment.apiUrl}/roles/get`, body);
  }

  deleteRoles(id:any):Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/roles/  ${id}`);
  }

  findAllByUserId(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/roles/findAllByUserId`);
  }
}
