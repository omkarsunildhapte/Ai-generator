import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { forkJoin } from 'rxjs';
import { AdminServies } from '../../../service/admin.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    TreeModule,
    DatePipe
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent implements OnInit {
  adminServies = inject(AdminServies);
  rolesList: any[] = [];
  displayDialog: boolean = false;
  loading: boolean = false;
  searchText: string = '';
  roleName: string = '';
  isDefault: boolean = false;
  id: number = 0;
  page: number = 1;
  limit: number = 10;
  sort: string = 'name';
  totalRecords: number = 0;
  permissionTree: any[] = [];
  selectedPermissions: any[] = [];

  ngOnInit(): void {
    this.getPermissionAndRoles();
  }

  getPermissionAndRoles() {
    this.loading = true;
    forkJoin([
      this.adminServies.findAllByUserIdPermission(),
      this.adminServies.getRoles(
        this.page,
        this.limit,
        this.sort,
        this.searchText
      ),
    ]).subscribe(
      ([permissionsResponse, rolesResponse]) => {
        this.loading = false;
        if (permissionsResponse.status == 200) {
          this.permissionTree = this.buildTree(permissionsResponse.res);
        }
        if (rolesResponse.status == 200) {
          this.rolesList = rolesResponse.res.roles.map((item: any) => ({
            ...item,
            checkbox: false,
          }));
          this.totalRecords = rolesResponse.res.total;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getRoles() {
    this.loading = true;
    this.adminServies
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
  }

  save() {
    const value = this.selectedPermissions.filter(e=>e.selectable).map(e=>e.data.id);
    if (this.roleName &&value) {
      const body = {
        id: this.id,
        name: this.roleName,
        status: this.isDefault ? 1 : 0,
        permission:value
      };
      this.adminServies.addAndUpdateRoles(body).subscribe(
        (res: any) => {
          if (res.status == 201) {
            this.displayDialog = false;
            this.getRoles();
          }
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  }

  close() {

  }
  
  buildTree(permissions: any[]): TreeNode[] {
    const map = new Map<string, TreeNode>();
    permissions.forEach(permission => {
      const node: TreeNode = {
        label: permission.name,
        data: permission,
        children: [],
        selectable: true
      };
      if (permission.isDefault === 1) {
        this.selectedPermissions.push(node);
      }
      map.set(permission.id, node);
    });
    const roots: TreeNode[] = [];
    permissions.forEach(permission => {
      const node = map.get(permission.id);
      if (node) {
        if (permission.parentId) {
          const parentNode = map.get(permission.parentId);
          if (parentNode) {
            parentNode.children!.push(node);
          }
        } else {
          roots.push(node);
        }
      }
    });
    return roots;
  }
  

  deleteData(rowData: any) {
    this.adminServies.deleteRoles(rowData.id).subscribe((res: any) => {
      if (res.status == 200) {
        this.getRoles();
      }
    });
  }

  editData(rowData: any) {
    this.displayDialog = true;
    this.id = rowData.id;
    this.isDefault = rowData.isDefault ==1 ? true:false;
    this.roleName = rowData.name;
  }

  onPageChange(event: any) {
    this.page = event.first == 0 ? 1 : (event.first / event.rows) + 1;
    this.limit = event.rows;
    this.getRoles();
  }

  onSort(event: any) {
    this.sort = event.multisortmeta[0].order === 1 ? 'name' : '-name';
    this.getRoles();
  }
}
