import { ActivityService } from './../../core/services/activity.service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JoinActivityService } from 'src/app/core/services/join-activity.service';
import { NavController } from '@ionic/angular';
import { ROUTE } from 'src/app/_constants/route.constant';

@Component({
  selector: 'app-activity-read-more',
  templateUrl: './activity-read-more.page.html',
  styleUrls: ['./activity-read-more.page.scss'],
})
export class ActivityReadMorePage implements OnInit {
  public activityID
  public activityItem
  public userJoinActivity
  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private joinActivityService: JoinActivityService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.activityID = this.route.snapshot.paramMap.get('id');
    this.getActivityByID();
    this.getUserJoinActivityByActivity()
  }

  getActivityByID() {
    this.activityService.getActivityDetail(this.activityID).subscribe(activityValue => {
      this.activityItem = activityValue
    })
  }

  async getUserJoinActivityByActivity() {
    try {
       this.userJoinActivity = await this.joinActivityService.getUserJoinActivityByActivityID(this.activityID)
    } catch (error) {

    }
  }

  viewProfile(uid) {
    this.navCtrl.navigateForward(`${ROUTE.PROFILE}/${uid}/${this.activityID}`)
  }
}
