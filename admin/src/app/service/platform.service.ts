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
  
  getImages(body:number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/platform/generateImage`,body);
  }
}
