
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SPORT_GROUP } from 'src/assets/data-master/sport-group';
import { NavController } from '@ionic/angular';
import { ROUTE } from 'src/app/_constants/route.constant';

@Component({
  selector: 'app-activitys',
  templateUrl: './activitys.page.html',
  styleUrls: ['./activitys.page.scss'],
})
export class ActivitysPage implements OnInit {
  public groupSport = SPORT_GROUP
  public idSport
  public sportActive
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.idSport = this.route.snapshot.paramMap.get('id');
    this.sportActive = this.groupSport.filter(val => val.id === this.idSport)[0]

  }

  onCreateActivity() {
    this.navCtrl.navigateForward(`${ROUTE.ACTIVITY_CREATE}/${this.idSport}`)
  }

}
