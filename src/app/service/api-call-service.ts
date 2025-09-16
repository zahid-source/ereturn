import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL_BACKEND} from './constant';

export interface AuthRequest {
  username: string;
  password: string;
  grantType: string;
  refreshToken?: string;
  rememberMe?: boolean;
}

export interface SignUpRequest {
  userIdentification: string;
  phone: string;
  feature: string;
  userType: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private authUrl = BASE_URL_BACKEND + '/authenticationservice/v3/api/authenticate/taxpayer';
  private signupUrl = BASE_URL_BACKEND + '/filingservice/v3/api/auth/sign-up';
  private generatePassUrl = BASE_URL_BACKEND + '/filingservice/v3/api/auth/generate-pass';

  constructor(private http: HttpClient) {
  }

  authenticate(payload: AuthRequest): Observable<any> {
    return this.http.post<any>(this.authUrl, payload);
  }

  signUp(payload: SignUpRequest): Observable<any> {
    return this.http.post(this.signupUrl, payload);
  }

  generatePassword(payload: any): Observable<any> {
    return this.http.post(this.generatePassUrl, payload);
  }

}
