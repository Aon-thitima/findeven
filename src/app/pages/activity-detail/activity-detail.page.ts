import { ROUTE } from 'src/app/_constants/route.constant';
import { Component, OnInit } from '@angular/core';
import { ActivityInterface } from 'src/app/core/models/activity.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/core/services/activity.service.service';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserInterface } from 'src/app/core/models/user.interface';
import { SPORT_GROUP } from 'src/assets/data-master/sport-group';


@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {
  public groupSport = SPORT_GROUP
  public activity: ActivityInterface = {}
  public id;
  public groupSportID: any;
  public userInfo: UserInterface;
  constructor(
    private activatedRoute: ActivatedRoute,
    private activityService: ActivityService,
    private toastCtel: ToastController,
    private navCtrl: NavController,
    private authService: AuthenticationService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.groupSportID = this.activatedRoute.snapshot.paramMap.get('groupID');
    if (this.id) {
      // ดึงข้อมูลกลับมาแสดงเวลาต้องการอัปเดทข้อมูล
      this.activityService.getActivityDetail(this.id).subscribe(activity => {
        this.activity = activity;
      });
    }
    this.getCurrentUser();
  }

  // ดึงข้อมูล user ปัจจุบัน
  async getCurrentUser() {
    this.userInfo = await this.authService.getUser();
  }

  // function สร้างกิจกรรม
  async addActivity() {
    this.activity.createBy = this.userInfo.uid;
    this.activity.group_sport = this.groupSportID;
    this.activity.userInfo = this.userInfo

    const toast = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: `ท่านต้องการต้องการบันทึกข้อมูลนี้ ?`,
      buttons: [
        {
          text: 'ยกเลิก',
          handler: (blah) => {
          }
        },
        {
          text: 'ตกลง',
          handler: async (blah) => {
            this.activityService.addActivity(this.activity).then(() => {
              this.navCtrl.navigateForward(`${ROUTE.ACTIVITY}/${this.groupSportID}`),
                this.showToast("Activity added");
            }, err => {
              this.showToast('There was a problem adding your Activity :(');
            });
          }
        }
      ]
    });
    await toast.present();
  }

  async deleteActivity() {
    const toast = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: `ท่านต้องการต้องการบันทึกข้อมูลนี้ ?`,
      buttons: [
        {
          text: 'ยกเลิก',
          handler: (blah) => {
          }
        },
        {
          text: 'ตกลง',
          handler: async (blah) => {
            this.activityService.delateActivity(this.activity.id).then(() => {
              this.navCtrl.navigateForward(`${ROUTE.ACTIVITY}/${this.groupSportID}`),
                this.showToast("Activity deleted");
            }, err => {
              this.showToast('There was a problem deleting your Activity :(');
            });
          }
        }
      ]
    });
    await toast.present();
  }

  async  updateActivity() {
    const toast = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: `ท่านต้องการต้องการบันทึกข้อมูลนี้ ?`,
      buttons: [
        {
          text: 'ยกเลิก',
          handler: (blah) => {
          }
        },
        {
          text: 'ตกลง',
          handler: async (blah) => {
            this.activityService.updateActivity(this.activity).then(() => {
              this.navCtrl.navigateForward(`${ROUTE.ACTIVITY}/${this.groupSportID}`),
                this.showToast("Activity updated");
            }, err => {
              this.showToast('There was a problem updating your Activity :(');
            });
          }
        }
      ]
    });
    await toast.present();
  }

  showToast(mag) {
    this.toastCtel.create({
      message: mag,
      duration: 2000
    }).then(toast => toast.present());
  }

}
