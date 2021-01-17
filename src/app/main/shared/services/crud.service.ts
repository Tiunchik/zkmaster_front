import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ZkNodeModel} from '../domains/zk-node.model';
import {RequestDto} from '../domains/request.dto';
import {BackEnd, Rest} from '../constants/constants';
import {LocationStrategy} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  backEnd: string;

  constructor(private http: HttpClient,
              private location: LocationStrategy) {
    this.backEnd = (location as any)._platformLocation.location.origin;
    if (this.backEnd.includes('localhost')) {
      this.backEnd = BackEnd;
    }
  }

  public getAll(host: string): Observable<ZkNodeModel> {
    return this.http
      .get<ZkNodeModel>(`${this.backEnd}${Rest}${host}`);
  }

  public addNode(dto: RequestDto): Observable<void> {
    return this.http.post<void>(`${this.backEnd}${Rest}${dto.host}`, dto);
  }

  public updateNode(dto: RequestDto): Observable<void> {
    return this.http.put<void>(`${this.backEnd}${Rest}${dto.host}`, dto);
  }

  public deleteNode(dto: RequestDto): Observable<void> {
    return this.http.delete<void>(`${this.backEnd}${Rest}${dto.host}${dto.path}`);
  }

}
