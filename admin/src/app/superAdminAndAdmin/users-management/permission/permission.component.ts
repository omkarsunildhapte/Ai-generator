import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { AdminServies } from '../../../service/admin.service';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    ConfirmDialogModule,
  ],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss',
})
export class PermissionComponent implements OnInit {
  permissionService = inject(AdminServies);
  data: any[] = [];
  displayDialog: boolean = false;
  searchText: string = '';
  permissionName: string = '';
  id: number = 0;
  page: number = 1;
  limit: number = 10;
  sort: string = 'name';
  loading: boolean = false;
  totalRecords: number = 0;
  isDefault: boolean = false;

  ngOnInit(): void {
    this.getPermission();
  }

  getPermission() {
    this.loading = true;
    this.permissionService.getPermissions(this.page, this.limit, this.sort, this.searchText).subscribe((response) => {
        if (response.status === 200) {
          this.data = response.res.permissions;
          this.data = this.data.map((item: any) => ({
            ...item,
            checkbox: false,
          }));
          this.totalRecords = response.res.total;
        }
        this.loading = false;
      });
  }

  save() {
    const body = {
      name: this.permissionName,
      is_default: this.isDefault ? 1 : 0,
      id: this.id,
    };
    if (body) {
      this.permissionService.addAndUpdatePermission(body).subscribe(
        (res: any) => {
          if (res.status == 201) {
            this.displayDialog = false;
            this.getPermission();
            this.close();
          } else {
          }
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  }

  deleteData(rowData: any) {
    this.permissionService.deletePermissions(rowData.id).subscribe((res: any) => {
      if (res.status == 200) {
        this.getPermission();
      }
    });
  }

  editData(rowData: any) {
    this.displayDialog = true;
    this.id = rowData.id;
    this.permissionName = rowData.name;
  }

  onPageChange(event: any) {
    this.page = event.first == 0 ? 1 : (event.first / event.rows) + 1;
    this.limit = event.rows;
    this.getPermission();
  }

  onSort(event: any) {
    this.sort = event.multisortmeta[0].order === 1 ? 'name' : '-name';
    this.getPermission();
  }

  close(){
    this.permissionName = '';
    this.isDefault = false;
    this.id = 0;
  }
}
