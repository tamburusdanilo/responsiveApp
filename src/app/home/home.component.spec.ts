import { HomeService } from './home.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Observable, of, throwError } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: HomeService;


  /* nao esta utilizando
   // stubs
   const registryStub: HomeComponent = jasmine.createSpyObj('HomeComponent', ['getUserData']);
   const fakeNames = {x: 1};
  */

  const homeResponse = { teste: 'teste' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [HomeService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HomeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should navigate on promise - success', async () => {

    spyOn(component, 'getUserData').and.callThrough();
    spyOn(service, 'getHomeData').and.returnValue(of(homeResponse));
    await component.getUserData();
    expect(component.test).toEqual(homeResponse);

  });


  it('should navigate on promise - error', async () => {

    spyOn(component, 'getUserData').and.callThrough();
    spyOn(service, 'getHomeData').and.returnValue(throwError({ status: 404 }));
    await component.getUserData();
    expect(component.test).toEqual(undefined);

  });




});
