import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ROUTE } from 'src/app/_constants/route.constant';
import { JoinActivityService } from 'src/app/core/services/join-activity.service';
import { UserInterface } from 'src/app/core/models/user.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-tab-settings',
  templateUrl: './tab-settings.page.html',
  styleUrls: ['./tab-settings.page.scss'],
})
export class TabSettingsPage implements OnInit {
  public userInfo: UserInterface;
  public userJoinActivityList
  constructor(
    private navCtrl: NavController,
    private joinActivityService: JoinActivityService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCurrentUser()
    this.getUserJoinActivity()
  }

  // ดึงข้อมูล user ปัจจุบัน
  async getCurrentUser() {
    this.userInfo = await this.authService.getUser();
  }

  async getUserJoinActivity() {
    this.userInfo = await this.authService.getUser();
    this.userJoinActivityList = await this.joinActivityService.getJoinActivityByUserID(this.userInfo.uid)
    console.log('this.userJoinActivityList=====>', this.userJoinActivityList)
  }


}
