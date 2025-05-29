import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gps } from './gps';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GpsService {
  apiURL = 'http://192.168.8.200:8011/api/gps';

  constructor(private httpClient: HttpClient) { }


  public get(): Observable<Gps> {
    return this.httpClient.get<Gps>(`${this.apiURL}/`);
  }

  public getAll(): Observable<Gps[]> {
    return this.httpClient.get<Gps[]>(`${this.apiURL}/all/`, { reportProgress: true });
  }
}
