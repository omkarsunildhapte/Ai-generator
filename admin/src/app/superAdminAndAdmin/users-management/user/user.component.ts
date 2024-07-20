import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { forkJoin } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { NewUsersComponent } from './new-users/new-users.component';
import { UpdateEmailComponent } from './update-email/update-email.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AdminServies } from '../../../service/admin.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    DropdownModule,
    NewUsersComponent,
    UpdateEmailComponent,
    UpdatePasswordComponent,
    DatePipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  userService = inject(UserService);
  emailExist = new FormControl('', [Validators.required, Validators.email])
  @ViewChild('newUserModel', { static: false }) newUserModel!: NewUsersComponent;
  @ViewChild('updateEmailModel', { static: false }) updateEmailModel!: UpdateEmailComponent;
  @ViewChild('updatePasswordModel', { static: false }) updatePasswordModel!: UpdatePasswordComponent;


  data: any[] = [];
  rolesList: any[] = [];
  displayDialog: boolean = false;
  userExist: boolean = false;
  searchText: string = '';
  page: number = 1;
  limit: number = 5;
  sort: string = 'name';
  loading: boolean = false;
  totalRecords: number = 0;
  rolesService = inject(AdminServies);
  ngOnInit(): void {
    forkJoin({
      res: this.userService.getUsers(1, 5, 'name',''),
    }).subscribe((response: any) => {
      if(response.res.status ==200){
        this.data = response.res.res.users;
        this.totalRecords = response.res.res.total;
      }
    });
  }
  
  getUser() {
    this.userService.getUsers(this.page, this.limit, this.sort, this.searchText).subscribe((res: any) => {
      if(res.status ==200){
        this.data = res.res.users;
        this.totalRecords = res.res.total;
      }
    },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  updateEmail(rowData: any) {
    this.updateEmailModel.user = rowData;
    this.updateEmailModel.userEmail = true;
  }

  updatePassword(rowData: any) {
    this.updatePasswordModel.user = rowData;
    this.updatePasswordModel.userEmail = true;
  }
  
  deactiveAndActive(rowData: any) {
    const status = rowData.account_status == 1 ? 0 : 1;
    this.userService.deactivateUser(status, rowData.id).subscribe((res: any) => {
      if(res.status==200){
        this.getUser();
      }
    })
  }

  deleteData(rowData: any) {
    this.userService.deleteUser(rowData.id).subscribe((res:any)=>{
      if(res.status==200){
        this.getUser();
      }
    })
  }


  editData(rowData: any) {
    this.displayDialog = true;
  }

  onPageChange(event: any) {
    this.page = event.first==0 ? 1 : (event.first/event.rows)+1;
    this.limit = event.rows;
  }

  onSort(event: any) {
    this.sort = event.multisortmeta[0].order === 1 ? 'name' : '-name';
  }

  userExisting() {
    if (this.emailExist.valid && this.emailExist.value) {
      this.userService.userExist(this.emailExist.value).subscribe((res: any) => {
        if (res.status == 200 && res.exists) {
        } else if (res.status == 200) {
          this.displayDialog = false;
          this.newUserModel.userForm.get('email')?.setValue(this.emailExist.value);
          this.newUserModel.userExist = true;
        }
      })
    }
  }
  
  getRoles(roles:any){
   return roles.map((e:any)=>e.role_name); 
  }

  getStatusClass(status: number): string {
    return status === 1
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  }
}
