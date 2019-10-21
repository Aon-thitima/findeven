import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/core/services/activity.service.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/core/services/chat.service';
import { UserInterface } from 'src/app/core/models/user.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import * as firebase from 'firebase';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  chat: string;
  activity;
  activityID;
  userInfo: UserInterface;
  dataChat: any = [];
  constructor(
    private activityServers: ActivityService,
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthenticationService,
    public popoverController: PopoverController
  ) { }

  ngOnInit() {
    setTimeout(() => {
      const element = document.getElementById('box');
      element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, 400);

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.activityID = id;
    if (id) {
      this.getActivity(id);
      this.getChat(id);
      this.getCurrentUser();
    }
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: true,
      componentProps: { message: this.activityID }
    });
    return await popover.present();
  }

  async getCurrentUser() {
    this.userInfo = await this.authService.getUser();
  }

  async getChat(id) {
    //ฟังก์ชั่นในการดึงข้อมูลแชท
    const response = this.chatService.getChat();
    response.subscribe(
     (val) => this.dataChat = val.filter(v => v['groupID'] === id),
      (error) => error
    );

    //การ debug ดูข้อมูลใช้ console.log(ค่าที่ต้องการ log ออกมาดู)
  }

  getActivity(id) {
     //ฟังก์ชั่นในการดึงกิจกรรม
    this.activityServers.getActivityDetail(id).subscribe(async activity => {
      if (activity) {
        this.activity = activity;
      }
    });
  }

  sendMessage(e) {
     //ฟังก์ชั่นในการส่งข้อมูลแชท
    const data = {
      specialMessage: true,
      message: this.chat,
      groupID: this.activityID,
      joinBy: this.userInfo.uid,
      status: 'active',
      imgBy: (this.userInfo.imageProfile) ? this.userInfo.imageProfile : '',
      fullName:this.userInfo.fullName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    if (this.chat) {
      this.chatService.sendMessage(data);
      this.chat = '';
    }
  }
}