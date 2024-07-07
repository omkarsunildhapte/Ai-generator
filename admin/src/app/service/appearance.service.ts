import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppearanceService {
  http=inject(HttpClient);

  updateBranding(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/branding`, data);
  }

  getBranding(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/branding`);
  }

  updateColor(colors: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/branding/colors`, colors);
  }

  getColors(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/branding/colors`);
  }
}
