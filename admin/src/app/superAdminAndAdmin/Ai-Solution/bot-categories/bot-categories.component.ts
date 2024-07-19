import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AISolutionService } from '../../../service/ai-solution.service';
@Component({
  selector: 'app-bot-categories',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './bot-categories.component.html',
  styleUrl: './bot-categories.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class BotCategoriesComponent {
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  categorieService = inject(AISolutionService);
  searchText: string = '';
  isDefaultFilter: string | null = null;
  displayDialog: boolean = false;
  data: any[] = [];
  limit: number = 10;
  totalRecords: number = 0;
  loading: boolean = false;
  page: number = 1;
  sort: string = 'name';
  isDefault: boolean = false;
  categorieName: string = '';
  id: number = 0;

  ngOnInit(): void {
    this.getBotCategories();
  }

  getStatusClass(status: number): string {
    return status === 1
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  }

  editData(rowData: any) {
    this.displayDialog = true;
    this.categorieName = rowData.name;
    this.id = rowData.id;
    this.isDefault = rowData.status == 1 ? true : false;
  }

  deleteData(rowData: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.categorieService
          .deleteBotCategory(rowData.id)
          .subscribe((res: any) => {
            if (res.status == 200) {
              this.getBotCategories();
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: res.res.message,
              });
            }
          });
      },
    });
  }

  save() {
    if (this.categorieName) {
      const body = {
        status: this.isDefault ? 1 : 0,
        name: this.categorieName,
        id: this.id,
      };
      this.categorieService.addAndUpdateBotCategory(body).subscribe((res: any) => {
        if (res.status == 201) {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: res.res.message,
          });
          this.getBotCategories();
          this.close();
        }
      });
    }
  }

  getBotCategories() {
    this.loading = true;
    const status =
      this.isDefaultFilter === 'true' ? 1 : this.isDefaultFilter === 'false' ? 0 : null;
    this.categorieService.getBotCategories(this.page, this.limit, this.sort, this.searchText, status).subscribe((response) => {
      if (response.status === 200) {
        this.data = response.res.categories;
        this.data = this.data.map((item: any) => ({
          ...item,
          checkbox: false,
        }));
        this.totalRecords = response.res.total;
      }
      this.loading = false;
    });
  }

  onPageChange(event: any) {
    this.page = event.first == 0 ? 1 : event.first / event.rows + 1;
    this.limit = event.rows;
    this.getBotCategories();
  }

  onSort(event: any) {
    this.sort = event.multisortmeta[0].order === 1 ? 'name' : '-name';
    this.getBotCategories();
  }
  
  close() {
    this.displayDialog = false;
    this.categorieName = '';
    this.isDefault = false;
    this.id = 0;
  }
}
