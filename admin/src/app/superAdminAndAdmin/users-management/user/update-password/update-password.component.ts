import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { UserService } from '../../../../service/user.service';
@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [DialogModule,ReactiveFormsModule,InputSwitchModule,FormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent {
  userEmail:boolean=false;
  verifyCondition:boolean=false;
  user:any
  newEmail= new FormControl('',[Validators.required]);
  userService = inject(UserService);
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  onCancel() {
  }
  update(){
    const body = {
      newPassword :this.newEmail.value,
      verifyCondition:this.verifyCondition,
      email:this.user.email
    }
    this.userService.updatePassword(body,this.user.id).subscribe((res:any)=>{
      if(res.status==200){
        this.userEmail =false;
        this.newEmail.reset();
        this.verifyCondition = false;
        this.notify.emit('');
      }
    })
  }
}
