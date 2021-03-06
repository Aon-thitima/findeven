import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserInterface } from 'src/app/core/models/user.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportUserInterface } from 'src/app/core/models/report-user.interface';
import { ReportUserService } from 'src/app/core/services/report_user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userInfo: UserInterface;
  activityID: any
  userInfoDetail: any = ''
  userID = ''
  selectEdit = false;
  selectEditModel = {
    fullName: '',
    imageProfile: '',
    phone: '',
    sex:'',
    address: ''
  }
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private reportUserService: ReportUserService
  ) { }

  ngOnInit() {
    this.userID = this.activatedRoute.snapshot.paramMap.get('id');
    this.activityID = this.activatedRoute.snapshot.paramMap.get('activityID');
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
      sex:this.userInfoDetail.sex,
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
      sex:this.selectEditModel.sex !=='' ? this.selectEditModel.sex : this.userInfoDetail.sex,
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


  async onClickReportUser(userId?: any) {
    // TODO REPORT USER
    const alert = await this.alertController.create({
      header: 'สาเหตุ',
      inputs: [
        {
          name: 'description',
          type: 'text',
          placeholder: 'สาเหตุ'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: data => {
            if (data.description === "") {
              this.failedAlert("กรุณากรอกรายละเอียดการรีพอท", userId);
            } else {
              this.reportUser(data.description)
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async failedAlert(text, userId) {
    const alert = await this.alertController.create({
      header: 'เเจ้งเตือน',
      subHeader: text,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.onClickReportUser(userId);
        }
      }]

    });
    await alert.present();
  }

  async reportUser(description) {
    const formData: ReportUserInterface = {
      description,
      user_id: this.userID,
      activity_id: this.activityID,
      reportAt: this.userInfo.uid
    }

    const checkReportDuplicate = await this.reportUserService.checkUserReport(formData)
    if (checkReportDuplicate['length'] > 0) {
      this.failedAlertDuplicate('ไม่สามารถรายงานผู้ใช้นี้ได้ เนื่องจากท่านได้รายงานผู้ใช้ในกิจกรรมนี้ไปแล้ว')
    } else {
      this.reportUserService.postReportUser(formData)
    }
  }


  async failedAlertDuplicate(text) {
    const alert = await this.alertController.create({
      header: 'เเจ้งเตือน',
      subHeader: text,
      buttons: [{
        text: 'OK',
        handler: () => {
        }
      }]

    });
    await alert.present();
  }
}
