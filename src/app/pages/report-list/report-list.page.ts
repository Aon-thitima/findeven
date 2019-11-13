import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ReportUserService } from 'src/app/core/services/report_user.service';
import { NavController } from '@ionic/angular';
import { ROUTE } from 'src/app/_constants/route.constant';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.page.html',
  styleUrls: ['./report-list.page.scss'],
})
export class ReportListPage implements OnInit {
  public listUserReport
  constructor(
    private navCtrl: NavController,
    private reportUserService: ReportUserService
  ) { }

  ngOnInit() {
    this.getListUserReport()
  }

  async getListUserReport() {
    this.listUserReport = await this.reportUserService.getListUserReport()
  }

  viewDetailUserReport(uid) {
    this.navCtrl.navigateForward(`${ROUTE.REPORT_DETAIL}/${uid}`)
  }
}
