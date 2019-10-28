import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/core/models/user.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivityService } from 'src/app/core/services/activity.service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {

  public activity: any = {
    name: '',
    imageProfile:'',
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
  }

}
