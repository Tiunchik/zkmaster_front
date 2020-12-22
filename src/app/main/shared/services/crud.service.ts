import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ZkNodeModel} from '../domains/zk-node.model';
import {ZKNODES_EXPML} from '../constants/constants';
import {RequestDto} from '../domains/request.dto';

// TODO: разобраться с location и как его инжектить

const BackEnd = 'http://localhost:8081';
const Rest = '/api/zkm/data/';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) {
  }

  public getAll(host: string): Observable<ZkNodeModel> {
    return this.http.get<ZkNodeModel>(`${BackEnd}${Rest}${host}`);
  }

  public addNode(dto: RequestDto): Observable<void> {
    return this.http.post<void>(`${BackEnd}${Rest}${dto.host}`, dto);
  }

  public updateNode(dto: RequestDto): Observable<void> {
    return this.http.put<void>(`${BackEnd}${Rest}${dto.host}`, dto);
  }

  public deleteNode(dto: RequestDto): Observable<void> {
    return this.http.delete<void>(`${BackEnd}${Rest}${dto.host}${dto.path}`);
  }

}
