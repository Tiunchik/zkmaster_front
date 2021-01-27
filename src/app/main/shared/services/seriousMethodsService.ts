import {HttpClient} from '@angular/common/http';
import {BackEnd, Injection, Transform} from '../constants/constants';
import {LocationStrategy} from '@angular/common';
import {CpDTOModel} from '../domains/cpDTO.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TransferDTOModel} from '../domains/transferDTO.model';

@Injectable({
  providedIn: 'root'
})
export class SeriousMethodsService {

  backEnd: string;

  constructor(private http: HttpClient,
              private location: LocationStrategy) {
    this.backEnd = (location as any)._platformLocation.location.origin;
    if (this.backEnd.includes('localhost')) {
      this.backEnd = BackEnd;
    }
  }

  public sendCopyPast(dto: CpDTOModel): Observable<void> {
    return this.http.post<void>(`${this.backEnd}${Injection}`, dto);
  }

  public toTxt(dto: TransferDTOModel): Observable<string[]> {
    return this.http.post<string[]>(`${this.backEnd}${Transform}${dto.host}`, dto);
  }
}
