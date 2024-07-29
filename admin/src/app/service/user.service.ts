import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  router= inject (Router);
  
  registerAdmin(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/registerAdmin`, body);
  }
  
  register(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/registerUser`, body);
  }

  login(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/login`, body);
  }
  
  verifyOtp(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/verifyOtp`, body);
  }

  regenerateOtp(email:any):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/user/regenerateOtp/${email}`);
  }
    
  forgotPassword(email:any):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/user/forgotPassword/${email}`);
  }
  
  resetPassword(body:any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/user/resetPassword`, body);
  }

  updateGoogleSettings(body:any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/google-settings`, body);
  }

  getGoogleSettings(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/google-settings`);
  }

  userExist(email: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user/exists/${email}`);
  }

  getUsers(page: number, limit: number, sort: string, search: string): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    if (sort) {
      params = params.set('sort', sort);
    }
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<any>(`${environment.apiUrl}/user`, { params });
  }
  
  create(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/create`, body);
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
  updateEmail(body: any,userid:any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/update-email`, body);
  }

  updatePassword(body: any,userid:any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/update-password`, body);
  }

  deactivateUser(status: any,userid:any): Observable<any> {
    const params = new HttpParams().set('status', status.toString());
    return this.http.put<any>(`${environment.apiUrl}/user/deactivate`, null);
  }

 

  deleteUser(userId:any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/user/delete`, null);
  }

  updateAffiliate(body: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user/updateAffiliate/${body}`);
  }

  getAffiliate(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/user/getAffiliate`,null);
  }

  getCountries(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/locations/countries`);
  }

  getStates(countryCode: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/locations/states/${countryCode}`);
  }

  getCities(countryCode: string, stateCode: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/locations/cities/${countryCode}/${stateCode}`);
  }
  getCurreny(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/locations/currencies`);
  }
  getLanguages(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/locations/languages`);
  }
}
