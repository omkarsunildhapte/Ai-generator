import { Component, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'notification',
  standalone: true,
  template: `
  <p-toast></p-toast>
  `,
  imports: [ToastModule,MessagesModule,MessageModule],
  providers: [MessageService, ConfirmationService]
})
export class NotificationComponent {
  messageService= inject(MessageService); 
  confirmationService= inject(ConfirmationService);
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  public showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showInfo(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }

  showWarn(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: message });
  }

  confirm(message: string, accept: () => void, reject?: () => void) {
    this.confirmationService.confirm({
      message: message,
      accept: accept,
      reject: reject
    });
  }
}
