import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ZkNode} from '../domains/ZkNode';
import {ZKNODES_EXPML} from '../constants/constants';

// TODO: разобраться с location и как его инжектить

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) {
  }

  public getAll(host: string): Observable<ZkNode> {
    return new Observable<ZkNode>((sub) => {
      setTimeout(() => {
        sub.next(ZKNODES_EXPML);
      }, 500);
    });
  }

}
