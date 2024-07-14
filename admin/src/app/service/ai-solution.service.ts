import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AISolutionService {
  http = inject(HttpClient);

  getCategorie(page: number, limit: number, sort: string, search: string, status: number|null): Observable<any> {
    const body = { page, limit, sort, search, status };
    return this.http.post<any>(`${environment.apiUrl}/categories/`, body);
  }

  getAllCategories(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/categories/getAllCategories`, null);
  }

  addAndUpdateCategory(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/categories/create`, body);
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/categories/delete/${id}`, null);
  }

  getQuestion(page: number, limit: number, sort: string, search: string, required: string |null, type: string |null): Observable<any> {
    const body = { page, limit, sort, search, required, type };
    return this.http.post<any>(`${environment.apiUrl}/question/`,body);
  }

  getAllQuestion(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/question/getAllQuestions`, null);
  }

  addAndUpdateQuestion(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/question/create`, body);
  }

  deleteQuestion(id: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/question/delete/${id}`, null);
  }

  getPersona(page: number, limit: number, sort: string, search: string): Observable<any> {
    const body = { page, limit, sort, search, status };
    return this.http.post<any>(`${environment.apiUrl}/personas/`, body);
  }

  getAllPersonas(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/personas/getAllPersonas`, null);
  }

  addAndUpdatePersona(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/personas/create`, body);
  }

  deletePersona(id: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/personas/delete/${id}`, null);
  }

  getPrompts(page: number, limit: number, sort: string, search: string, status: string | null, type: string | null, category: string | null): Observable<any> {
    const body = { page, limit, sort, search, status, type, category };
    return this.http.post<any>(`${environment.apiUrl}/prompts/`, body);
  }

  getAllPrompts(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/prompts/getAllPersonas`, null);
  }

  addAndUpdatePrompts(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/prompts/create`, body);
  }

  deletePrompts(id: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/prompts/delete/${id}`, null);
  }
  getAllPersonasCategoriesQuestions(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/prompts/getAllPersonasCategoriesQuestions`, null);
  }

}
