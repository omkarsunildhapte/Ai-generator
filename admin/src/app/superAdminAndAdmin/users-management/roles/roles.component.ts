import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { RolesService } from '../../../service/roles.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { PermisssionService } from '../../../service/permisssion.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CheckboxModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    ConfirmDialogModule,
    MultiSelectModule,
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent implements OnInit {
  rolesService = inject(RolesService);
  permisssionService = inject(PermisssionService);
  rolesList: any[] = [];
  displayDialog: boolean = false;
  searchText: string = '';
  roleName: string = '';
  id: number = 0;
  page: number = 1;
  limit: number = 5;
  sort: string = 'name';
  loading: boolean = false;
  totalRecords: number = 0;
  permissionList: any[] = [];
  roles: any[] = [];

  ngOnInit(): void {
    this.getPermissionAndRoles();
  }

  getPermissionAndRoles() {
    this.loading = true;
    forkJoin([
      this.permisssionService.findAllByUserId(),
      this.rolesService.getRoles(
        this.page,
        this.limit,
        this.sort,
        this.searchText
      ),
    ]).subscribe(
      ([permissionsResponse, rolesResponse]) => {
        this.loading = false;
        if (permissionsResponse.status == 200) {
          this.permissionList = permissionsResponse.res;
        }
        if (rolesResponse.status == 200) {
          this.rolesList = rolesResponse.res.roles;
          this.rolesList = this.rolesList.map((item: any) => ({
            ...item,
            checkbox: false,
          }));
          this.totalRecords = rolesResponse.res.total;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    );
  }

  getRoles() {
    this.loading = true;
    this.rolesService
      .getRoles(this.page, this.limit, this.sort, this.searchText)
      .subscribe((response) => {
        this.rolesList = response.res.roles;
        this.totalRecords = response.res.total;
        this.rolesList = this.rolesList.map((item: any) => ({
          ...item,
          checkbox: false,
        }));
        this.loading = false;
      });
  }

  add() {
    this.displayDialog = !this.displayDialog;
    this.roles = this.permissionList.filter(
      (permission) => permission.isDefault
    );
  }

  getPermissionName(id: number): string {
    return this.permissionList.find((e) => e.id == id).name;
  }

  save() {
    if (this.roleName) {
      const body = {
        id: this.id,
        name: this.roleName,
        permissions: this.roles.map((e) => e.id),
      };
      this.rolesService.addAndUpdate(body).subscribe(
        (res: any) => {
          if (res.status == 201) {
            this.displayDialog = false;
            this.roles = [];
            this.getRoles();
          }
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  }

  deleteData(rowData: any) {
    this.rolesService.deleteRoles(rowData.id).subscribe((res: any) => {
      if (res.status == 200) {
        this.getRoles();
      }
    });
  }

  editData(rowData: any) {
    this.displayDialog = true;
    this.id = rowData.id;
    this.roleName = rowData.name;
    this.roles = this.permissionList.filter((permission) =>
      rowData.permissions.includes(permission.id)
    );
  }

  onPageChange(event: any) {
    this.page = event.first==0 ? 1 : (event.first/event.rows)+1;
    this.limit = event.rows;
    this.getRoles();
  }

  onSort(event: any) {
    this.sort = event.multisortmeta[0].order === 1 ? 'name' : '-name';
    this.getRoles();
  }
}
