import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityInterface } from 'src/app/core/models/activity.interface';
import { ActivityService } from 'src/app/core/services/activity.service.service';
import { AlertController, NavController } from '@ionic/angular';
import { ChatService } from 'src/app/core/services/chat.service';
import { UserInterface } from 'src/app/core/models/user.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab-activity',
  templateUrl: './tab-activity.page.html',
  styleUrls: ['./tab-activity.page.scss'],
})
export class TabActivityPage implements OnInit {
  public activity: Observable<ActivityInterface[]>;
  userInfo: UserInterface;
  constructor(
    private activityService: ActivityService,
    public alertController: AlertController,
    private navCtrl: NavController,
    private chatService: ChatService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.activity = this.activityService.getActivity();
    this.getCurrentUser();
  }

  async getCurrentUser() {
    this.userInfo = await this.authService.getUser();
  }



  async clickJoinChat(id) {
    this.activityService.getActivityDetail(id).subscribe(async activity => {
      const checkJoinGroup = await this.chatService.checkStatusJoin(this.userInfo.uid, activity.id);
      if (activity && checkJoinGroup) {

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
                this.joinGroup(activity);
              }
            }
          ]
        });
        await toast.present();
      } else {
        this.navCtrl.navigateForward(`/members/tabs/tabActivity/chat/${activity.id}`);
      }
    });
  }

  joinGroup(activity) {
    console.log('=========>', this.userInfo)
    // tslint:disable-next-line:no-construct
    const date = new String(new Date());
    const data = {
      specialMessage: true,
      message: `${this.userInfo.fullName} has joined the room`,
      groupID: activity.id,
      joinBy: this.userInfo.uid,
      status: 'active',
      imgBy: (this.userInfo.imageProfile) ? this.userInfo.imageProfile : '',
      fullName: this.userInfo.fullName,
      // createAt: date.valueOf()
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    this.chatService.joinGroup(data);
    this.navCtrl.navigateForward(`/members/tabs/tabActivity/chat/${activity.id}`);
    this.chatService.updateStatusJoin(this.userInfo.uid, activity.id);
  }
}
