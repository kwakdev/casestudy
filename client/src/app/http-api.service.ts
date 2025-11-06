import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService<T> {
  constructor(private http: HttpClient, private endPoint: String) {
  }

  apiURL(): string {
    return window.location.hostname === "localhost" ? `http://localhost:8080/api` : "/api";
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiURL()}/${this.endPoint}`);
  }

  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiURL()}/${this.endPoint}/${id}`);
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(`${this.apiURL()}/${this.endPoint}`, data);
  }

  update(data: T): Observable<T> {
    return this.http.put<T>(`${this.apiURL()}/${this.endPoint}`, data);
  }

  delete(id: string | number): Observable<number> {
    return this.http.delete<number>(`${this.apiURL()}/${this.endPoint}/${id}`);
  }

  getAllById(id: string | number): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiURL()}/${this.endPoint}/${id}`);
  }
}