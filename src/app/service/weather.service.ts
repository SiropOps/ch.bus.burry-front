import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiURL = 'http://192.168.8.200/api/weather';

  constructor(private httpClient: HttpClient) { }


  public getOutsides(): Observable<Weather[]> {
    return this.httpClient.get<Weather[]>(`${this.apiURL}/outsides`);
  }

  public getInsides(): Observable<Weather[]> {
    return this.httpClient.get<Weather[]>(`${this.apiURL}/insides`);
  }

}
