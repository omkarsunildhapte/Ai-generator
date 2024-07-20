import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServies {
  http = inject(HttpClient);

  addAndUpdatePermission(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/permission`, body);
  }

  getPermissions(page: number, limit: number, sort: string, search: string): Observable<any> {
    const body = { page, limit, sort, search, };
    return this.http.post<any>(`${environment.apiUrl}/permission/get`, body);
  }

  deletePermissions(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/permission/${id}`);
  }

  findAllByUserIdPermission(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/permission/findAllByUserId`);
  }

  addAndUpdateRoles(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/roles`, body);
  }

  getRoles(page: number, limit: number, sort: string, search: string): Observable<any> {
    const body = {page,limit,sort,search}
    return this.http.post<any>(`${environment.apiUrl}/roles/get`, body);
  }

  deleteRoles(id:any):Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/roles/  ${id}`);
  }
  
  getPlan(page: number, limit: number, sort: string, search: string): Observable<any> {
    const body = { page, limit, sort, search, status };

    return this.http.post<any>(`${environment.apiUrl}/plan/`, body);
  }
  addAndUpdatePlan(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/plan/create`, body);
  }

  deletePlan(id: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/plan/delete/${id}`, null);
  }
}
