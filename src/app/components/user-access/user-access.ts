import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

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
  badge: string = 'Not generated';
  toastMessage: string = '';
  showToast: boolean = false;

  generateUrl() {
    if (/^\\d{12}$/.test(this.tin)) {
      this.generatedUrl = `/verify/${this.tin}`;
      this.badge = 'Done';
    } else {
      this.generatedUrl = '';
      this.badge = 'Error';
    }
  }

  copy() {
    if (this.generatedUrl) {
      navigator.clipboard.writeText(this.generatedUrl).then(() => {
        this.toastMessage = 'Copied to clipboard!';
        this.showToast = true;

        // Hide toast after 2.5s
        setTimeout(() => {
          this.showToast = false;
        }, 2500);
      });
    }
  }

  redirect() {
    if (this.generatedUrl) {
      window.open(this.generatedUrl, '_blank');
    }
  }
}
