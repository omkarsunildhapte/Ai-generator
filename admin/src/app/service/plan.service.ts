import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  http = inject(HttpClient);


  getPlan(page: number,  limit: number,  sort: string,  search: string): Observable<any> {
    const body = {   page,   limit,   sort,   search,   status };
  
    return this.http.post<any>(`${environment.apiUrl}/plan/`,body);
  }
  addAndUpdatePlan(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/plan/create`, body);
  }
 
  deletePlan(id: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/plan/delete/${id}`, null);
  }
}
