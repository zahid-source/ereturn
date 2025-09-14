import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserAccess} from './components/user-access/user-access';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserAccess],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ereturn');
}
