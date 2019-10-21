import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/core/services/chat.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserInterface } from 'src/app/core/models/user.interface';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { NavParams, NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  userInfo: UserInterface;
  activityID: any;
  constructor(
    private chatService: ChatService,
    private authService: AuthenticationService,
    private navParams: NavParams,
    private navCtrl: NavController,
    public popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  async getCurrentUser() {
    this.userInfo = await this.authService.getUser();
  }


  async leftGroup() {
    const data = {
      specialMessage: true,
      message: `${this.userInfo.fullName} has left the room`,
      groupID:  this.navParams.get('message'),
      joinBy: this.userInfo.uid,
      status: 'inactive',
      imgBy: (this.userInfo.imageProfile)  ? this.userInfo.imageProfile : '',
      fullName:this.userInfo.fullName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    this.chatService.leftGroup(data);
    this.navCtrl.navigateForward(`/members/tabs/tabActivity`);
    this.popoverController.dismiss();

  }

}