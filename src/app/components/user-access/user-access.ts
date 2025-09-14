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
  generatedUrl: string = '';
  badge: string = 'Not generated';

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
      navigator.clipboard.writeText(this.generatedUrl);
      this.badge = 'Copied!';
    }
  }

  redirect() {
    if (this.generatedUrl) {
      window.open(this.generatedUrl, '_blank');
    }
  }
}
