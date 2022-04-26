import { OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TransactionService } from '../../services/transaction.service';
import { ConstantService } from '../../constant/constant-service';
import { isIE, b2cPolicies, environment } from "../../../environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { StorageService } from "../../services/storage.service";
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home-layout.component.html'
})

export class HomeLayoutComponent implements OnInit, OnDestroy {
  public sidebarMinimized = false;
  user: any;
  countPharma: 0;
  welcome: String;
  lblgLogin: String;
  lblLogout: String;
  languages: Array<{ name: string; value: string }>;
  previousLanguage: string;
  isIframe = false;
  loggedIn = false;
  subscriptions: Subscription[] = [];

  constructor(public router: Router,
    private transactionService: TransactionService,
    private constantService: ConstantService,
    private translateService: TranslateService,
    private storageService: StorageService,
    private confirmationService: ConfirmationService,
    private broadcastService: BroadcastService,
    private authService: MsalService) {
    this.languages = [];

    const data = this.storageService.getSessionStorageItem(this.constantService.SESSION_STORAGE_USER);
    
    for (let index = 0; index < this.constantService.LANGUAGE.length; index++) {
      this.languages.push({ name: this.translateService.instant(this.constantService.LANGUAGE[index].name), value: this.constantService.LANGUAGE[index].value });
    }

    this.checkAccount();
    if (this.loggedIn) {
      this.user = this.getAccount();
    }
  }

  switchLang(lang: string) {
    this.confirmationService.confirm({
      message: this.translateService.instant('module.defaultLayout.languageChangeQuestion', "languageChangeQuestion"),
      header: this.translateService.instant('module.defaultLayout.informationLossAlert', "informationLossAlert"),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.translateService.use(lang);
        window.location.reload();
      },
      reject: () => {
      },
    });
  }

  ngOnInit() {
    this.welcome = this.translateService.instant('module.login.welcome', "welcome");
    this.lblgLogin = this.translateService.instant('module.login.login', "login");
    this.lblLogout = this.translateService.instant('module.login.logout', "logout");

    let loginSuccessSubscription: Subscription;
    let loginFailureSubscription: Subscription;

    this.isIframe = window !== window.parent && !window.opener;
    this.checkAccount();

    // event listeners for authentication status
    loginSuccessSubscription = this.broadcastService.subscribe('msal:loginSuccess', (success) => {

      // We need to reject id tokens that were not issued with the default sign-in policy.
      // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
      // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
      if (success.idToken.claims.acr === b2cPolicies.names.resetPassword) {
        window.alert('Password has been reset successfully. \nPlease sign-in with your new password');
        return this.logout();
      }

      console.log('login succeeded. id token acquired at: ' + new Date().toString());
      console.log(success);

      this.user = this.getAccount();
      this.checkAccount();
      window.location.reload();

    });

    loginFailureSubscription = this.broadcastService.subscribe('msal:loginFailure', (error) => {
      console.log('login failed');
      console.log(error);

      if (error.errorMessage) {
        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf('AADB2C90118') > -1) {
          if (isIE) {
            this.authService.loginRedirect(b2cPolicies.authorities.resetPassword);
          } else {
            this.authService.loginPopup(b2cPolicies.authorities.resetPassword);
          }
        }
      }
    });

    // redirect callback for redirect flow (IE)
    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      console.log('Redirect Success: ', response);
    });

    this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));
    this.subscriptions.push(loginSuccessSubscription);
    this.subscriptions.push(loginFailureSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  checkAccount() {
    let user = this.getAccount();
    this.loggedIn = !!user;
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

  logout() {
    sessionStorage.removeItem(this.constantService.SESSION_STORAGE_USER);
    this.authService.logout();
  }

  editProfile() {
    if (isIE) {
      this.authService.loginRedirect(b2cPolicies.authorities.editProfile);
    } else {
      this.authService.loginPopup(b2cPolicies.authorities.editProfile);
    }
  }
}
