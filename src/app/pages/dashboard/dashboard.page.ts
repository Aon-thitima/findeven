import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userInfo: UserInterface;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserDetail();
  }

  private async getUserDetail() {
    try {
      const userInfo = await this.authService.getUser();
      this.userInfo = userInfo;
    } catch (error) {}
  }

  async logout() {
    try {
      await this.authService.logoutUser();
      this.router.navigateByUrl('login');
    } catch (error) {}
  }

}