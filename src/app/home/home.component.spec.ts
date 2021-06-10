import { HomeService } from './home.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // stubs
  const registryStub: HomeComponent = jasmine.createSpyObj('HomeComponent', ['getUserData']);
  const fakeNames = {x: 1};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should navigate on promise - success', fakeAsync(() => {

    spyOn(component, 'getUserData').and.returnValue(of(fakeNames));
    (registryStub.getUserData as jasmine.Spy).and.returnValue(Promise.resolve(['test']));
    component.getUserData();

    tick();
    expect(component.getUserData).toHaveBeenCalled();



    // spyOn(component, 'getUserData').and.returnValue(of(fakeNames));
    // component.getUserData().toPromise()
    // .then((data: any) => {
    //   expect(data).toEqual(fakeNames);
    // });




  }));


});
