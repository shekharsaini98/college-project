import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServicesOffered} from '../models/services-offered';
import {Url} from '../../environments/environment';
import {UserService} from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceOfferedService {

  constructor(private http: HttpClient, private user: UserService) {
  }

  sUrl = Url + 'service/';

  getAllservicesForUser(): Observable<ServicesOffered[]> {
    const Id = this.user.CurrentUser._id;
    return this.http.get<ServicesOffered[]>(this.sUrl + Id);
  }

  getPendingService(): Observable<ServicesOffered[]> {
    const Id = this.user.CurrentUser._id;
    return this.http.get<ServicesOffered[]>(`${this.sUrl}pending/${Id}`);
  }

  updateService(id: string, update): Observable<any> {
    return this.http.put<any>(this.sUrl + id, update);
  }

  postServices(service: ServicesOffered): Observable<ServicesOffered> {
    return this.http.post<ServicesOffered>(this.sUrl, service);
  }

}
