import { ROUTE } from './../../_constants/route.constant';
import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/core/models/user.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivityService } from 'src/app/core/services/activity.service.service';

@Component({
  selector: 'app-tab-home',
  templateUrl: './tab-home.page.html',
  styleUrls: ['./tab-home.page.scss'],
})
export class TabHomePage implements OnInit {
  [x: string]: any;

  public activity: any = {
    name: '',
    type_activity: '',
    description: '',
    Location: '',
    datet: '',
    sex: '',
    type_sport:'',
    createBy: ''
  };

  userInfo: UserInterface;

  constructor(
    private authService: AuthenticationService,
    private toastCtel: ToastController,
    private activatedRoute: ActivatedRoute,
    private activityService: ActivityService,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.activityService.getActivityDetail(id).subscribe(activity => {
        this.activity = activity;
      });
    }
    this.getUserDetail();
  }

  async getCurrentUser() {
    this.userInfo = await this.authService.getUser();
  }

  postActivity(){
    this.navCtrl.navigateForward(ROUTE.POST_ACTIVITY)
  }

  joinActivity(){
    this.navCtrl.navigateForward(ROUTE.JOIN_ACTIVITY)
  }

  addActivity() {
    this.activity.createBy =  this.userInfo.uid;
    this.activityService.addActivity(this.activity).then(() => {
      this.navCtrl.navigateForward('members/tabs/tabActivity'),
        this.showToast("Activity added");
    }, err => {
      this.showToast('There was a problem adding your Activity :(');
    });
  }

  deleteActivity() {
    this.activityService.delateActivity(this.activity.id).then(() => {
      this.navCtrl.navigateForward('members/tabs/tabActivity'),
        this.showToast("Activity deleted");
    }, err => {
      this.showToast('There was a problem deleting your Activity :(');
    });
  }

  updateActivity() {
    this.activityService.updateActivity(this.activity).then(() => {
      this.showToast("Activity updated");
    }, err => {
      this.showToast('There was a problem updating your Activity :(');
    });
  }

  showToast(mag) {
    this.toastCtel.create({
      message: mag,
      duration: 2000
    }).then(toast => toast.present());
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

  gotoUserDetail() {
    this.navCtrl.navigateForward(ROUTE.HOME_DETAIL);
  }

}