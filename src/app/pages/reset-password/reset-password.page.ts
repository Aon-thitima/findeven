import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ValidatePattern } from 'src/app/_constants/app.constant';
import { AuthInterface } from 'src/app/core/models/auth.interface';
import { ROUTE } from 'src/app/_constants/route.constant';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  form: FormGroup;
  errorMessage = '';
  validationMessages = {
    email: [
      { type: 'required', message: 'ระบุอีเมล' },
      { type: 'pattern', message: 'ระบุรูปแบบอีเมล' }
    ],
  };

  loading: HTMLIonLoadingElement;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(ValidatePattern.EMAIL)
      ])),
    });
  }

  async resetPassword(form: FormGroup): Promise<void> {
    if (!form.valid) {
      this.presentAlert();
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

      const request = (form.value as AuthInterface);

      this.authService.resetPassword(request.email)
        .then(
          () => {
            this.loading.dismiss().then(() => {
              this.presentAlertResetPasswordSuccess(request.email);
            });
          },
          (error) => {
            this.loading.dismiss().then(async () => {
              const alert = await this.alertController.create({
                message: error.message,
                buttons: [{ text: 'Ok', role: 'cancel' }],
              });
              await alert.present();
            });
          }
        );
    }
  }

  gotoLoginPage() {
    this.navCtrl.navigateBack(ROUTE.LOGIN);
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      header: 'ข้อมูลผิดพลาด',
      message: 'อีเมลไม่ถูกต้อง.',
      buttons: ['OK']
    });

    await alert.present();
  }

  private async presentAlertResetPasswordSuccess(email: string) {
    const alert = await this.alertController.create({
      header: 'รีเซ็ตรหัสผ่านสำเร็จ!',
      message: `กรุณาตรวจสอบข้อมูลที่ ${email}`,
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.navCtrl.navigateBack(ROUTE.LOGIN);
          }
        }
      ]
    });

    await alert.present();
  }
}
