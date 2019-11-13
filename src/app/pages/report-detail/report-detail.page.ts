import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportUserService } from 'src/app/core/services/report_user.service';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ROUTE } from 'src/app/_constants/route.constant';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.page.html',
  styleUrls: ['./report-detail.page.scss'],
})
export class ReportDetailPage implements OnInit {
  public userID
  public listDetail
  public userInfoDetail
  constructor(
    private activatedRoute: ActivatedRoute,
    private reportUserService: ReportUserService,
    public alertController: AlertController,
    private authService: AuthenticationService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.userID = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUserReportDetail()
    this.getUserDetail()
  }

  private async getUserDetail() {
    try {
      this.userInfoDetail = await this.authService.getUserDetail(this.userID);
    } catch (error) { }
  }

  async getUserReportDetail() {
    this.listDetail = await this.reportUserService.getUserReportDetail(this.userID)
  }

  async onClickReport() {
    const alert = await this.alertController.create({
      header: 'เเจ้งเตือน',
      subHeader: 'ท่านต้องการบล็อกผู้ใช้งานนี้ ?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: (blah) => {
          }
        },
        {
          text: 'ตกลง',
          handler: (blah) => {
            const result = this.authService.reportUser(this.userID, true)
            if (result.description === 'success') {
              this.navCtrl.navigateForward(`${ROUTE.REPORT_LIST}`)
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async onClickUnReport() {
    const alert = await this.alertController.create({
      header: 'เเจ้งเตือน',
      subHeader: 'ท่านต้องการเปิดใช้งานผู้ใช้งานนี้ ?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: (blah) => {
          }
        },
        {
          text: 'ตกลง',
          handler: (blah) => {
            const result = this.authService.reportUser(this.userID, false)
            if (result.description === 'success') {
              this.navCtrl.navigateForward(`${ROUTE.REPORT_LIST}`)
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
