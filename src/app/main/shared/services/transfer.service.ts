import {HttpClient} from '@angular/common/http';
import {RequestDto} from '../domains/request.dto';
import {Observable} from 'rxjs';
import {BackEnd, Transform} from '../constants/constants';
import {LocationStrategy} from '@angular/common';

export class TransferService {

  backEnd: string;

  constructor(private http: HttpClient,
              private location: LocationStrategy) {
    this.backEnd = (location as any)._platformLocation.location.origin;
    if (this.backEnd.includes('localhost')) {
      this.backEnd = BackEnd;
    }
  }

  public getCommands(dto: RequestDto): Observable<string[]> {
    return this.http.get<string[]>(`${this.backEnd}${Transform}${dto.host}`);
  }



}
