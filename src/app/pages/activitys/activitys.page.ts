import { async } from '@angular/core/testing';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SPORT_GROUP } from 'src/assets/data-master/sport-group';
import { NavController, AlertController } from '@ionic/angular';
import { ROUTE } from 'src/app/_constants/route.constant';
import { Observable } from 'rxjs';
import { ActivityInterface } from 'src/app/core/models/activity.interface';
import { ActivityService } from 'src/app/core/services/activity.service.service';
import { JoinActivityService } from 'src/app/core/services/join-activity.service';
import { JoinActivityInterface } from 'src/app/core/models/join-activity.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserInterface } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-activitys',
  templateUrl: './activitys.page.html',
  styleUrls: ['./activitys.page.scss'],
})
export class ActivitysPage implements OnInit {
  public activity: any = [];
  public groupSport = SPORT_GROUP
  public idSport
  public sportActive
  public userInfo: UserInterface;
  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private joinActivityService: JoinActivityService,
    public alertController: AlertController,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getActivity()
    this.idSport = this.route.snapshot.paramMap.get('id');
    this.sportActive = this.groupSport.filter(val => val.id === this.idSport)[0]
    this.getCurrentUser();
  }

  getActivity() {
    this.activityService.getActivity().subscribe(val => this.activity = val);
  }
  // ดึงข้อมูล user ปัจจุบัน
  async getCurrentUser() {
    this.userInfo = await this.authService.getUser();
  }

  onCreateActivity() {
    this.navCtrl.navigateForward(`${ROUTE.ACTIVITY_CREATE}/${this.idSport}`)
  }

  clickJoinChat(id) {
    console.log('===========>', id)

  }

  async searchActivity(textSearch) {
    try {
      if (textSearch !== '') {
        this.activity = await this.activityService.searchActivity(textSearch, true)
      } else {
        this.activity = await this.activityService.searchActivity(textSearch, false)
      }
    } catch (error) {
    }
  }

  async clickJoinActivity(activity) {
    try {
      const toast = await this.alertController.create({
        header: 'ต้องการเข้าร่วมกิจกรรม?',
        message: `ท่านต้องการเข้าร่วมกิจกรรม ${activity.name} ?`,
        buttons: [
          {
            text: 'ยกเลิก',
            handler: (blah) => {
            }
          },
          {
            text: 'ตกลง',
            handler: (blah) => {
              const setData: JoinActivityInterface = {
                user_id: this.userInfo.uid,
                activity_id: activity.id
              }
              this.joinActivityService.joinActivity(setData);
            }
          }
        ]
      });
      await toast.present();
    } catch (error) {
      console.log('error======>', error)
    }
  }

  async clickUnJoinActivity(activity) {
    try {
      const toast = await this.alertController.create({
        header: 'ต้องการยกเลิกการเข้าร่วมกิจกรรม?',
        message: `ท่านต้องการยกเลิกการเข้าร่วมกิจกรรม ${activity.name} ?`,
        buttons: [
          {
            text: 'ยกเลิก',
            handler: (blah) => {
            }
          },
          {
            text: 'ตกลง',
            handler: async (blah) => {
              const res = await this.joinActivityService.unJoinActivity(activity.id, this.userInfo.uid);
              if (res.description === 'success') {
              }
            }
          }
        ]
      });
      await toast.present();
    } catch (error) {
      console.log('error======>', error)
    }
  }

}
