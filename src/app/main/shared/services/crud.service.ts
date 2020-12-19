import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ZkNodeModel} from '../domains/zk-node.model';
import {ZKNODES_EXPML} from '../constants/constants';
import {RequestDto} from '../domains/request.dto';

// TODO: разобраться с location и как его инжектить

const BackEnd = 'http://localhost:8081';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) {
  }

  public getAll(host: string): Observable<ZkNodeModel> {
    console.log(`sen request to - ${BackEnd}/api/zkm/${host}`);
    return this.http.get<ZkNodeModel>(`${BackEnd}/api/zkm/${host}`);
  }

  public addNode(dto: RequestDto): Observable<void> {
    return this.http.put<void>(`${BackEnd}/api/zkm/${dto.host}`, dto);
  }

  public updateNode(dto: RequestDto): Observable<void> {
    return this.http.patch<void>(`${BackEnd}/api/zkm/${dto.host}`, dto);
  }

  public deleteNode(dto: RequestDto): Observable<void> {
    return this.http.delete<void>(`${BackEnd}/api/zkm/${dto.host}/${dto.path}`);
  }

}
