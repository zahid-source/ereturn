import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ApiCallService, AuthRequest} from '../../service/api-call-service';
import {BASE_URL_UI, PASSWORD} from '../../service/constant';

@Component({
  selector: 'app-user-access',
  imports: [
    FormsModule
  ],
  templateUrl: './user-access.html',
  styleUrl: './user-access.css'
})
export class UserAccess {
  tin: string = '';
  generatedUrl: string = '-----';
  toastMessage: string = '';
  showToast: boolean = false;

  constructor(private api: ApiCallService) {
  }


  generateUrl() {
    const payload: AuthRequest = {
      username: this.tin,
      password: PASSWORD,
      grantType: 'password',
      refreshToken: '',
      rememberMe: true
    };


    this.api.authenticate(payload).subscribe({
      next: (res) => {
        this.toast('Authenticated successfully');
        this.generatedUrl = BASE_URL_UI + '/#/trp/' + res.replyMessage.body.id_token + '/' + res.replyMessage.body.refresh_token;
      },
      error: (err) => {
        this.toast('Registered Successfully');
        this.startSignUpProcess();
      }
    });
  }

  startSignUpProcess() {
    this.api.signUp({
      userIdentification: this.tin,
      phone: '01834520200',
      feature: 'REGISTRATION',
      userType: 'TAXPAYER'
    }).subscribe({
      next: (res) => {
        this.generatePassword();
      },
      error: (err) => {
        this.toast('Sign-up failed');
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
      phone: "01834520200",
      newPass: PASSWORD,
      retypedNewPass: PASSWORD,
      feature: "REGISTRATION",
      userType: "TAXPAYER",
      otp: "698569"
    }).subscribe({
      next: (res) => {
        this.toast('New registration done successfully.');
        this.generateUrl();
      },
      error: (err) => {
        this.toast('Invalid TIN or cannot generate token using default password.');
        console.error(err);
      }
    });
  }
}
