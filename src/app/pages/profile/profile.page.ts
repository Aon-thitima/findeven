import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserInterface } from 'src/app/core/models/user.interface';
import { Router, ActivatedRoute } from '@angular/router';

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
    public alertController: AlertController,
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
  }

  private async getUserDetail() {
    try {
      this.userInfoDetail = await this.authService.getUserDetail(this.userID);
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
      fullName: this.userInfoDetail.fullName,
      imageProfile: this.userInfoDetail.imageProfile,
      phone: this.userInfoDetail.phone,
      address: this.userInfoDetail.address
    }
  }

  onCancelEdit() {
    this.selectEdit = !this.selectEdit
  }


  async onClickSubmit() {
    const dataMaster = {
      fullName: this.selectEditModel.fullName !== '' ? this.selectEditModel.fullName : this.userInfoDetail.fullName,
      imageProfile: this.selectEditModel.imageProfile !== '' ? this.selectEditModel.imageProfile : this.userInfoDetail.imageProfile,
      phone: this.selectEditModel.phone !== '' ? this.selectEditModel.phone : this.userInfoDetail.phone,
      address: this.selectEditModel.address !== '' ? this.selectEditModel.address : this.userInfoDetail.address
    }
    // รวม object
    Object.assign(this.userInfoDetail, dataMaster)
    const toast = await this.alertController.create({
      header: 'แจ้งเตือน!',
      message: `ท่านต้องการแก้ไขข้อมูลนี้ ?`,
      buttons: [
        {
          text: 'ยกเลิก',
          handler: (blah) => {
          }
        },
        {
          text: 'ตกลง',
          handler: (blah) => {
            this.authService.updateProfile(this.userID, this.userInfoDetail)
            this.selectEdit = false
          }
        }
      ]
    });
    await toast.present();
  }


  onClickReportUser(userId) {
    // TODO REPORT USER
  }
}
