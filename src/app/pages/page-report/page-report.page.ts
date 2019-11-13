import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-report',
  templateUrl: './page-report.page.html',
  styleUrls: ['./page-report.page.scss'],
})
export class PageReportPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  async logout(){
    try {
      await this.authService.logoutUser();
      this.router.navigateByUrl('login');
    } catch (error) { }
  }
}
