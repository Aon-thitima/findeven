import { Component, OnInit } from '@angular/core';
import { ActivityInterface } from 'src/app/core/models/activity.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/core/services/activity.service.service';
import { ToastController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserInterface } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {


  public activity: any = {
    name: '',
    notes: '',
    Location: '',
    datet: '',
    sex: '',
    sport:'football,basketball,badminton,Pingpong,swimming,Futsal,tabletennis,Fitness,Run',
    createBy: ''
  };
  userInfo: UserInterface;
  constructor(
    private activatedRoute: ActivatedRoute,
    private activityService: ActivityService,
    private toastCtel: ToastController,
    private navCtrl: NavController,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.activityService.getActivityDetail(id).subscribe(activity => {
        this.activity = activity;
      });
    }
    this.getCurrentUser();
  }

  async getCurrentUser() {
    this.userInfo = await this.authService.getUser();
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

}