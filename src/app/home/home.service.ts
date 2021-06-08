import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { homeDataMock } from './home.mock';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private shared: SharedService) { }


  public getHomeData(): any {
    return this.shared.get('https://www.boredapi.com/api/activity');
    // return of(homeDataMock);
  }
}
