import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
import { isIE, b2cPolicies, environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { ConstantService } from '../constant/constant-service';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  subscriptions: Subscription[] = [];
  isIframe = false;
  loggedIn = false;

  constructor(private authService: MsalService, private transactionService: TransactionService, private constantService: ConstantService, private storageService: StorageService) {
  }



  getAccount() {
    return this.authService.getAccount();
  }

  login() {
    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }
  }

  editProfile() {
    if (isIE) {
      this.authService.loginRedirect(b2cPolicies.authorities.editProfile);
    } else {
      this.authService.loginPopup(b2cPolicies.authorities.editProfile);
    }
  }
}
