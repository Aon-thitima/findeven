import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../../core/services/authentication.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthInterface } from '../../core/models/auth.interface';
import { ROUTE } from 'src/app/_constants/route.constant';
import { Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  providerFb: firebase.auth.FacebookAuthProvider;
  [x: string]: any;

  form: FormGroup;
  errorMessage = '';
  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'pattern', message: 'Password must be at least 5 char.' }
    ]
  };
  loading: HTMLIonLoadingElement;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private fb: Facebook,
    public platform: Platform
  ) { }

  facebookLogin() {
    if (this.platform.is('cordova')) {
      console.log('platform: cordova');
      this.facebookCordova();
    } else {
      console.log('platform: web');
      this.facebookWeb();
    }
  }

  facebookCordova() {
    this.fb.login(['email']).then((response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          const dataProfile = {
            email: success.user.email,
            fullName: success.user.displayName,
            address: '', //เพิ่มในหน้าแก้ไข
            phone: success.user.phoneNumber,
            imageProfile: success.user.photoURL,
            sex: '',
            userReport: false
          }
          this.authService.updateProfile(success.user.uid, dataProfile)
          this.navCtrl.navigateForward(ROUTE.MEMBER);
        }).catch((error) => {
          console.log('Erreur:' + JSON.stringify(error));
        });
    }).catch((error) => { console.log(error); })
  }

  facebookWeb() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((success) => {
        const dataProfile = {
          email: success.user.email,
          fullName: success.user.displayName,
          address: '', //เพิ่มในหน้าแก้ไข
          phone: success.user.phoneNumber,
          imageProfile: success.user.photoURL,
          sex: '',
          userReport: false
        }
        this.authService.updateProfile(success.user.uid, dataProfile)
        this.navCtrl.navigateForward(ROUTE.MEMBER);
      }).catch((error) => {
        console.log('Erreur: ' + JSON.stringify(error));
      });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });
  }

  async loginUser(loginForm: FormGroup): Promise<void> {
    try {
      if (!loginForm.valid) {
        this.presentAlert();
      } else {

        this.loading = await this.loadingCtrl.create();
        await this.loading.present();

        const request = (loginForm.value as AuthInterface);

        const user = await this.authService.loginUser(request);

        if (!user.user) {
          return;
        }

        this.loading.dismiss().then(() => {
          this.navCtrl.navigateForward(ROUTE.MEMBER);
        });
      }
    } catch (error) {
      this.loading.dismiss().then(async () => {
        const alert = await this.alertController.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }],
        });
        await alert.present();
      });
    }
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward(ROUTE.REGISTER);
  }

  gotoResetPassword() {
    this.navCtrl.navigateForward(ROUTE.RESET_PASSWORD);
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ข้อมูลผิดพลาด',
      message: 'อีเมล หรือ รหัสผ่านไม่ถูกต้อง.',
      buttons: ['OK']
    });

    await alert.present();
  }

}