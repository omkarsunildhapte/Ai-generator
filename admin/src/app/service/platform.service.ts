import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  http = inject(HttpClient);

  getUserCategories(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/platform/getUserCategories`);
  }

  getPrompts(promptId:number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/platform/getPrompts/${promptId}`);
  }

  getDefaultUpdatePlan(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/platform/getDefaultUpdatePlan`);
  }
  
  getPlatformPrimePlans(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/platform/getPlatformPrimePlans`);
  }
  
  getImages(body:number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/platform/generateImage`,body);
  }
  
  createPlatformPlanHistroy(body:any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/platform/createPlatformPlanHistroy`,body);
  }

  getAllPlanHistroy(page: number, limit: number, sort: string): Observable<any> {
    const body = { page, limit, sort};
    return this.http.post<any>(`${environment.apiUrl}/platform/getAllPlanHistroy`, body);
  }

  resetUpdateUser(body:any){
    return this.http.post<any>(`${environment.apiUrl}/platform/resetUpdateUser`, body);
  }
  
  resetUpdatePassword(newPassword: string) {
    return this.http.get<any>(`${environment.apiUrl}/platform/resetUpdatePassword/${newPassword}`);
  }

  updateDefaultLanguage(languages_code: any) {
    return this.http.get<any>(`${environment.apiUrl}/platform/updateDefaultLanguage/${languages_code}`);
  }
}
