import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { TransactionService } from '../../../services/transaction.service';
import { environment, b2cPolicies } from '../../../../environments/environment';
import { ConstantService } from '../../../constant/constant-service';
import { MsalService } from '@azure/msal-angular';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userB2c: any;
  existingExternalUser: boolean = false;
  existingExternalUserApproval: number = 0;

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private constantService: ConstantService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private router: Router,
    private authMsalService: MsalService,
    private storageService: StorageService,
  ) {

  }

  ngOnInit() {
  }

  confirmation() {
    this.confirmationService.confirm({
      message: this.translateService.instant('module.directClaims.policies.message', "moduleName"),
      header: this.translateService.instant('module.directClaims.policies.header', "moduleName"),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.messageService.add({ severity: 'info', summary: this.translateService.instant('module.directClaims.policies.summaryConfirmed', "moduleName"), detail: this.translateService.instant('module.directClaims.politics.confirmDetail', "moduleName") });
        this.router.navigate(['home/claimMenu']);
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: this.translateService.instant('module.directClaims.policies.summaryReject', "moduleName"), detail: this.translateService.instant('module.directClaims.politics.rejectDetail', "moduleName") });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }
}
