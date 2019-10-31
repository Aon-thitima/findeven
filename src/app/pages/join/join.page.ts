import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserInterface } from 'src/app/core/models/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {
  [x: string]: any;
  public data = [
    {
      id: '001',
      image: 'https://scontent.fbkk2-5.fna.fbcdn.net/v/t1.15752-9/71143833_2983490841679297_3807802946754707456_n.png?_nc_cat=110&_nc_oc=AQlFS5XSqtut2PKLfT1GFvbdscoKvAnee0eXTmuPWPfeT7f0qeT6CVPYWOzxkNKbKmY&_nc_ht=scontent.fbkk2-5.fna&oh=d9889612dc905f56f8c1ccae46d0a954&oe=5E276E76',
      name: 'ฟุตบอล'
    },
    {
      id: '002',
      image: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.15752-9/71741792_444412523093791_4059466649953107968_n.png?_nc_cat=100&_nc_oc=AQmt1W78b2k2FOO1q3TAFpOHx8-gMaxlfPweq_RUdhTDnjb3eU6GEApJnKhgLtSsxLA&_nc_ht=scontent.fbkk2-8.fna&oh=c609259bc0eed1714207040b584725b4&oe=5E1A20A3',
      name: 'บาสเกตบอล'
    },
    {
      id: '003',
      image: 'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.15752-9/71251975_779266892544808_2881135195405156352_n.png?_nc_cat=107&_nc_oc=AQnhQ41XiuKme4VDGHYGH4ROIXo4ft2Y6vwAWOLLGYIlmtcDIv0N7RChJhfeeDvaIQs&_nc_ht=scontent.fbkk2-6.fna&oh=b1427df2b92e857b82194413a7c6c556&oe=5E221E25',
      name: 'แบตมินตัน'
    },
    {
      id: '004',
      image: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.15752-9/71278041_1208819139302271_5883238140407185408_n.png?_nc_cat=103&_nc_oc=AQlDZt0y-zYrPlPdmAxokgWo03PopcX69g5bPMRA1C3_7GG7p21ml1xW0F7LeigtEAw&_nc_ht=scontent.fbkk2-8.fna&oh=630dc3c864bf0ad2fa793c5f32622237&oe=5E207B6E',
      name: 'ปิงปอง'
    },
    {
      id: '005',
      image: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.15752-9/71693923_534953177262742_4910168606068703232_n.png?_nc_cat=105&_nc_oc=AQll7Sk5_VuAJ6CKoxOOY4rgtXn0-Cn8MKX6zVVgPcIXg-UtCGVulTJGDD2nmtHQclU&_nc_ht=scontent.fbkk2-8.fna&oh=418f3ff5ad47a497db5df260ab11aef4&oe=5E5815B7',
      name: 'ว่ายน้ำ'
    },
    {
      id: '006',
      image: 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.15752-9/71890791_548719855895499_4336468529894129664_n.png?_nc_cat=101&_nc_oc=AQmNnhra4YaS5ZbnLvofR4u5pM3I0KGPuIbSwj0AJ0xT4J3FsMDkTktrhLFAkx52MUA&_nc_ht=scontent.fbkk2-7.fna&oh=48fe6746a2f472ad14b373979fd6faee&oe=5E61130B',
      name: 'ฟุตซอล'
    },
    {
      id: '007',
      image: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.15752-9/71788589_2355704058077172_8345916557653704704_n.png?_nc_cat=102&_nc_oc=AQl4Ux_ICHiDA1yLvXsZtI5Erk1cMBjTZRINgMxNdRRKkje5PpG7bWQU-IMXNxf4x8E&_nc_ht=scontent.fbkk2-8.fna&oh=a3d158ac351a122afebcfc6f505cd94d&oe=5E247846',
      name: 'วอลเล่'
    },
    {
      id: '008',
      image: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.15752-9/70925031_2558044870976329_599752368539566080_n.png?_nc_cat=100&_nc_oc=AQkHP2QBFP1BeBSmcdtS0TPpw23mfTtLrHCyK8cCsVisa0SEsiws7BvAa9xCw_mDR1I&_nc_ht=scontent.fbkk2-8.fna&oh=d2dc1160c6cb9ce8e9dbb9887ffcf437&oe=5E2FAF41',
      name: 'เทนนิส'
    },
    {
      id: '009',
      image: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.15752-9/71543911_722491568175915_1433397347370401792_n.png?_nc_cat=105&_nc_oc=AQltCniky6aGCzgVrZ7NfwrvUonVI99hzCiH3gJWo_R1Cs1yV2xR-08mgfFzIHXccsY&_nc_ht=scontent.fbkk2-8.fna&oh=e9be08acb78aea272c8c126935c509d2&oe=5E5AAA70',
      name: 'วิ่ง'
    },
    {
      id: '010',
      image: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.15752-9/71750925_702252883612094_6098577617261166592_n.png?_nc_cat=102&_nc_oc=AQlzYs49_QaKAa_9QCgP-Tj5yXvqRlodCnK5_Rj6i3PrMUUT3Isng_lpqbojrArGXts&_nc_ht=scontent.fbkk2-8.fna&oh=bc8615ace8f3a2ee72fbd9841bbd3a77&oe=5E1BD1AA',
      name: 'ฟิตเนส'
    },
  ]

  public activity: any = {
    name: '',
    type_activity: '',
    description: '',
    Location: '',
    date: '',
    sex: '',
    type_sport:'',
    createBy: ''
  };
  userInfo: UserInterface;
  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private toastCtel: ToastController,
    private router: Router,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.activityService.getActivityDetail(id).subscribe(activity => {
        this.activity = activity;
      });
  }
  this.getUserDetail();
}

private async getUserDetail() {
  try {
    const userInfo = await this.authService.getUser();
    this.userInfo = userInfo;
  } catch (error) {}
}

async getCurrentUser() {
  this.userInfo = await this.authService.getUser();
}

addActivity() {
  this.activity.createBy =  this.userInfo.uid;
  this.activityService.addActivity(this.activity).then(() => {
    this.navCtrl.navigateForward('members/tabs/tabActivity'),
      this.showToast("Activity added");
  }, err => {
    this.showToast('There was a problem adding your Activity :(');
  });

}

deleteActivity() {
  this.activityService.delateActivity(this.activity.id).then(() => {
    this.navCtrl.navigateForward('members/tabs/tabActivity'),
      this.showToast("Activity deleted");
  }, err => {
    this.showToast('There was a problem deleting your Activity :(');
  });

}

updateActivity() {
  this.activityService.updateActivity(this.activity).then(() => {
    this.showToast("Activity updated");
  }, err => {
    this.showToast('There was a problem updating your Activity :(');
  });
}

showToast(mag) {
  this.toastCtel.create({
    message: mag,
    duration: 2000
  }).then(toast => toast.present());
}

onClickDetail(id) {
  this.navCtrl.navigateForward(`group-sport/${id}`)
   console.log('=======>', id)
 }

}
