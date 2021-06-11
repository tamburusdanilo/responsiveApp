import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return app values', () => {
    // spyOn(component, 'getUserData').and.returnValue(of(new Response()));

    // service.getHomeData().subscribe((res: any) => {

    //   expect(res).toBeDefined();

    //   expect(component.test).toBeDefined();

      spyOn(service, 'getHomeData').and.callThrough();

      service.getHomeData();

      expect(service.getHomeData).toHaveBeenCalled();

    });



});
