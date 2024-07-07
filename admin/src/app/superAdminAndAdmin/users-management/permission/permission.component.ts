import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { PermisssionService } from '../../../service/permisssion.service';

@Component({
  selector: 'app-permission',
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
  ],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss',
})
export class PermissionComponent implements OnInit {
  permissionService = inject(PermisssionService);
  data: any[] = [];
  displayDialog: boolean = false;
  searchText: string = '';
  permisssionName: string = '';
  id: number = 0;
  page: number = 1;
  limit: number = 5;
  sort: string = 'name';
  loading: boolean = false;
  totalRecords: number = 0;
  isDefault: boolean = false;

  ngOnInit(): void {
    this.getPermission();
  }

  getPermission() {
    this.loading = true;
    this.permissionService
      .getPermissions(this.page, this.limit, this.sort, this.searchText)
      .subscribe((response) => {
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
      name: this.permisssionName,
      is_default: this.isDefault ? 1 : 0,
      id: this.id,
    };
    if (body) {
      this.permissionService.addAndUpdate(body).subscribe(
        (res: any) => {
          if (res.status == 201) {
            this.displayDialog = false;
            this.getPermission();
            this.permisssionName = '';
            this.isDefault = false;
            this.id = 0;
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
    this.permissionService
      .deletePermissions(rowData.id)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.getPermission();
        }
      });
  }

  editData(rowData: any) {
    this.displayDialog = true;
    this.id = rowData.id;
    this.permisssionName = rowData.name;
  }

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.limit = event.rows;
    this.getPermission();
  }

  onSort(event: any) {
    this.sort = event.multisortmeta[0].order === 1 ? 'name' : '-name';
    this.getPermission();
  }

  toggleAllSelection(event: any) {
    const isChecked = event.checked;
    this.data = this.data.map((item: any) => ({
      ...item,
      checkbox: isChecked,
    }));
  }
}
