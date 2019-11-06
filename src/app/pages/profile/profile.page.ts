import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserInterface } from 'src/app/core/models/user.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE } from 'src/app/_constants/route.constant';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userInfo: UserInterface;
  userInfoDetail: any = ''
  userID = ''
  selectEdit = false;
  selectEditModel = {
    fullName: '',
    imageProfile: '',
    phone: '',
    address: ''
  }
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userID = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUserDetail();
    this.getCurrentUser();
  }

  gotoBack() {
    this.navCtrl.navigateBack('');
  }

  // ดึงข้อมูล user ปัจจุบัน
  async getCurrentUser() {
    this.userInfo = await this.authService.getUser();
    console.log('  this.userInfo=====>',  this.userInfo)
  }

  private async getUserDetail() {
    try {
      this.userInfoDetail = await this.authService.getUserDetail(this.userID);
      console.log(' this.userInfoDetail=====>',  this.userInfoDetail)
    } catch (error) { }
  }

  async logout() {
    try {
      await this.authService.logoutUser();
      this.router.navigateByUrl('login');
    } catch (error) { }
  }

  editProfile() {
    this.selectEdit = true
    this.selectEditModel = {
      fullName:  this.userInfoDetail.fullName,
      imageProfile: this.userInfoDetail.imageProfile,
      phone: this.userInfoDetail.phone,
      address: this.userInfoDetail.address
    }
  }

  onCancelEdit() {
    this.selectEdit = !this.selectEdit
  }


  onClickReportUser(userId) {
    // TODO REPORT USER
  }
}
