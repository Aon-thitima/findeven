import { JoinChatService } from './../../core/services/join-chat.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ChatService } from 'src/app/core/services/chat.service';
import { UserInterface } from 'src/app/core/models/user.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import * as firebase from 'firebase';
import { ROUTE } from 'src/app/_constants/route.constant';

@Component({
  selector: 'app-tab-activity',
  templateUrl: './tab-activity.page.html',
  styleUrls: ['./tab-activity.page.scss'],
})
export class TabActivityPage implements OnInit {
  public chatList: any = [];
  userInfo: UserInterface;
  constructor(
    public alertController: AlertController,
    private authService: AuthenticationService,
    private joinChatServices: JoinChatService,
    private navCtrl: NavController,
    private chatService: ChatService
  ) { }

  ngOnInit() {
  }

  async getCurrentUser() {
    this.userInfo = await this.authService.getUser();
  }

  ionViewWillEnter() {
    this.getCurrentUser();
    this.getChatList();
  }

  async getChatList() {
    await this.authService.getUser();
    this.chatList = await this.joinChatServices.getListChatJoin(this.userInfo.uid)
  }

  onChat(activityID) {
    this.navCtrl.navigateForward(`${ROUTE.CHAT}/${activityID}`);
  }

  async onClickDelete(item) {
    const toast = await this.alertController.create({
      header: 'แจ้งเตือน!',
      message: `ท่านต้องการลบแชทนี้ ?`,
      buttons: [
        {
          text: 'ยกเลิก',
          handler: (blah) => {
          }
        },
        {
          text: 'ตกลง',
          handler: (blah) => {
            this.joinChatServices.delateChat(item.id).then(_ => {
              this.getChatList()
              const data = {
                specialMessage: true,
                message: `${this.userInfo.fullName} has left the room`,
                groupID: item.activity_id,
                joinBy: this.userInfo.uid,
                statusChat: 'inactive',
                imgBy: this.userInfo.imageProfile,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              };
              this.chatService.leftGroup(data);
            })
          }
        }
      ]
    });
    await toast.present();
  }
}
