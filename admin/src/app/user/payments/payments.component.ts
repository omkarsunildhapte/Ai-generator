import { Component, inject, OnInit } from '@angular/core';
import { PlatformService } from '../../service/platform.service';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    TableModule,
    DatePipe
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
  providers:[DatePipe]
})
export class PaymentsComponent implements OnInit {
  platformService = inject(PlatformService);
  data: any[] = [];
  limit: number = 10;
  totalRecords: number = 0;
  loading: boolean = false;
  page: number = 1;
  sort: string = 'name';

 ngOnInit(): void {
   this.getPaymentHistory();
 }

  getPaymentHistory() {
    this.loading = true;
    this.platformService.getAllPlanHistroy(this.page, this.limit, this.sort).subscribe((response) => {
      if (response.status === 200) {
        this.data = response.res.plans;
        this.totalRecords = response.res.total;
      }
      this.loading = false;
    });
  }

  onPageChange(event: any) {
    this.page = event.first == 0 ? 1 : event.first / event.rows + 1;
    this.limit = event.rows;
    this.getPaymentHistory();
  }

  onSort(event: any) {
    this.sort = event.multisortmeta[0].order === 1 ? 'name' : '-name';
    this.getPaymentHistory();
  }
  getStatusClass(status: string): string {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  }
}
