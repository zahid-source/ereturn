import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ApiCallService, AuthRequest} from '../../service/api-call-service';
import {BASE_URL_UI, OTP, PASSWORD, PHONE} from '../../service/constant';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-user-access',
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './user-access.html',
  styleUrl: './user-access.css'
})
export class UserAccess {
  tin: string = '';
  generatedUrl: string = '-----';
  toastMessage: string = '';
  showToast: boolean = false;
  toastType: string = 'success';

  constructor(private api: ApiCallService) {
  }


  generateUrl(silent: boolean = false) {
    // this.generatedUrl = '-----';
    const payload: AuthRequest = {
      username: this.tin,
      password: PASSWORD,
      grantType: 'password',
      refreshToken: '',
      rememberMe: true
    };


    this.api.authenticate(payload).subscribe({
      next: (res) => {
        if(!silent)
        this.toast('Url generated successfully');
        this.generatedUrl = BASE_URL_UI + '/#/trp/' + res.replyMessage.body.id_token + '/' + res.replyMessage.body.refresh_token;
      },
      error: (err) => {
        this.startSignUpProcess();
      }
    });
  }

  startSignUpProcess() {
    this.api.signUp({
      userIdentification: this.tin,
      phone: PHONE,
      authMethod: 'PHONE',
      feature: 'REGISTRATION',
      userType: 'TAXPAYER'
    }).subscribe({
      next: (res) => {
        this.generatePassword();
      },
      error: (err) => {
        this.errorToast('Invalid TIN/Password');
        console.error(err);
      }
    });
  }


  copy() {
    if (this.generatedUrl) {
      navigator.clipboard.writeText(this.generatedUrl).then(() => {
        this.toast('Copied to clipboard!');
      });
    }
  }

  toast(message: string) {
    this.toastType = 'success';
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2500);
  }

  errorToast(message: string) {
    this.toastType = 'error';
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 2500);
  }

  redirect() {
    if (this.generatedUrl) {
      window.open(this.generatedUrl, '_blank');
    }
  }

  generatePassword() {
    this.api.generatePassword({
      userIdentification: this.tin,
      phone: PHONE,
      newPass: PASSWORD,
      retypedNewPass: PASSWORD,
      authMethod: 'PHONE',
      feature: "REGISTRATION",
      userType: "TAXPAYER",
      otp: OTP
    }).subscribe({
      next: (res) => {
        this.toast('New registration done successfully.');
        this.generateUrl(true);
      },
      error: (err) => {
        this.toast('Invalid TIN or cannot generate token using default password.');
        console.error(err);
      }
    });
  }
}
