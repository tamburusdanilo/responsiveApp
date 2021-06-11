import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  test: any;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {

    this.getUserData();
  }

  // public getUserData(): any {
  //   this.homeService.getHomeData().subscribe((data: any) => {
  //     this.test = data;

  //   });

  // }



  public getUserData(): any {
    this.homeService.getHomeData().toPromise()
      .then((data: any) => {
        this.test = data;
      })
      .catch((error: any) => {
        console.log(error);
      });

  }

}
