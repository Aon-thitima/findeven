import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ROUTE } from 'src/app/_constants/route.constant';

@Component({
  selector: 'app-tab-settings',
  templateUrl: './tab-settings.page.html',
  styleUrls: ['./tab-settings.page.scss'],
})
export class TabSettingsPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  gotoAbout() {
    this.navCtrl.navigateForward(ROUTE.ABOUT);
  }

}