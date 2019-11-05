import { ROUTE } from './../../_constants/route.constant';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NavController } from '@ionic/angular';
import { UserInterface } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage implements OnInit {
  public userInfo: UserInterface;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private navCtrl: NavController,
  ) {
  }

  ngOnInit() {
    this.getCurrentUser()
  }

  async logout() {
    try {
      await this.authService.logoutUser();
      this.router.navigateByUrl('login');
    } catch (error) {}
  }

    // ดึงข้อมูล user ปัจจุบัน
    async getCurrentUser() {
      this.userInfo = await this.authService.getUser();
    }

    yourProfileUser() {
      this.navCtrl.navigateForward(`${ROUTE.PROFILE}/${this.userInfo.uid}`)
    }

}
