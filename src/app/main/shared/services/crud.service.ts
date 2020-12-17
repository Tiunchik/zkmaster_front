import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ZkNodeModel} from '../domains/zk-node.model';
import {ZKNODES_EXPML} from '../constants/constants';
import {RequestDto} from '../domains/request.dto';

// TODO: разобраться с location и как его инжектить

const HOST = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) {
  }

  public getAll(host: string): Observable<ZkNodeModel> {
    return new Observable<ZkNodeModel>((sub) => {
      setTimeout(() => {
        sub.next(ZKNODES_EXPML);
      }, 500);
    });
  }

  public addNode(dto: RequestDto): Observable<void> {
    return this.http.put<void>(`${HOST}/zkm`, dto);
  }

  public updateNode(dto: RequestDto): Observable<void> {
    return this.http.patch<void>(`${HOST}/zkm`, dto);
  }

  public deleteNode(dto: RequestDto): Observable<void> {
    return this.http.delete<void>(`${HOST}/zkm/${dto.host}/${dto.path}`);
  }

}
