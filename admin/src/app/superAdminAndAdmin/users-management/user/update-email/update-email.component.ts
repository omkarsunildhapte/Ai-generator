import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-update-email',
  standalone: true,
  imports: [DialogModule,ReactiveFormsModule,InputSwitchModule,FormsModule],
  templateUrl: './update-email.component.html',
  styleUrl: './update-email.component.scss'
})
export class UpdateEmailComponent implements OnInit {
  userEmail:boolean=false;
  verifyCondition:boolean=false;
  user:any
  newEmail= new FormControl('',[Validators.required,Validators.email]);
  userService = inject(UserService);
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
  }
  onCancel() {
  }
  update(){
    const body = {
      newEmail :this.newEmail.value,
      verifyCondition:this.verifyCondition,
    }
    this.userService.updateEmail(body,this.user.id).subscribe((res:any)=>{
      if(res.status==200){
        this.userEmail =false;
        this.newEmail.reset();
        this.verifyCondition = false;
        this.notify.emit('');
      }
    })
  }
}
