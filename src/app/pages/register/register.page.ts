import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ROUTE } from 'src/app/_constants/route.constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;
  errorMessage = '';
  successMessage = '';
  loading: any;

  validationMessages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fullName: new FormControl(''),
      imageProfile: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  async tryRegister(signUpForm: FormGroup): Promise<void> {
    try {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

      await this.authService.register(signUpForm.value);

      await this.loadingCtrl.dismiss();
      this.navCtrl.navigateBack(ROUTE.LOGIN);
    } catch (error) {
      this.loadingCtrl.dismiss().then(async () => {
        const alert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }],
        });
        await alert.present();
      });
    }
  }

  goLoginPage() {
    this.navCtrl.navigateBack(ROUTE.LOGIN);
  }

}