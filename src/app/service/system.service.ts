import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { System } from './system';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  apiURL = 'http://raspburrypi4/api/system';

  constructor(private httpClient: HttpClient) { }


  public get(): Observable<System> {
    return this.httpClient.get<System>(`${this.apiURL}/`);
  }

  public shutdown(): Observable<void> {
    return this.httpClient.put<void>(`${this.apiURL}/shutdown/`, null, { reportProgress: true });
  }

  public reboot(): Observable<void> {
    return this.httpClient.put<void>(`${this.apiURL}/reboot/`, null, { reportProgress: true });
  }

  public dump(): Observable<void> {
    return this.httpClient.put<void>(`${this.apiURL}/dump/`, null, { reportProgress: true });
  }
}
