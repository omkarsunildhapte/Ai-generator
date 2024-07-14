import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PlanService } from '../../../service/plan.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-plans',
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
    ReactiveFormsModule,
    DropdownModule
  ],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
})
export class PlansComponent implements OnInit{
  planService = inject(PlanService);
  userService = inject(UserService);
  data: any[] = [];
  currencies: any[] = [];
  displayDialog: boolean = false;
  searchText: string = '';
  status: string = '';
  id: number = 0;
  page: number = 1;
  limit: number = 5;
  sort: string = 'name';
  loading: boolean = false;
  totalRecords: number = 0;
  planForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    features: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    plan_type: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    currency_name: new FormControl('', Validators.required),
    word_limit: new FormControl('', Validators.required),
    image_limit: new FormControl('', Validators.required),
    seats_limit: new FormControl('', Validators.required),
    payment_api_webhook: new FormControl('', Validators.required),
    payment_api_key: new FormControl('', Validators.required),
    secret_key: new FormControl('', Validators.required),
  })
  typeOptions = [
    { label: 'Paid', value: 'paid' },
    { label: 'Free', value: 'free' },
  ];

  planDurationOptions = [
    { label: '1 Month', value: '1_month' },
    { label: '3 Months', value: '3_months' },
    { label: '6 Months', value: '6_months' },
    { label: '1 Year', value: '1_year' }
  ];


  ngOnInit(): void {
    this.getPlan();
    this.userService.getCurreny().subscribe((res:any)=>{
      if(res.status==200){
        this.currencies =res.res
      }
    })
  }

  editData(rowData: any) {
    this.displayDialog = true;
    this.id = rowData.id;
    this.planForm.patchValue(rowData);
  }

  deleteData(rowData: any) {
    this.planService.deletePlan(rowData.id).subscribe((res: any) => {
      if(res.status==200){
        this.getPlan();
      }
    });
  }

  save() {
    if (this.planForm.valid) {
      let body:any = this.planForm.getRawValue();
      body.id = this.id
      
      this.planService.addAndUpdatePlan(body).subscribe((res: any) => {
        if (res.status == 201) {
          this.displayDialog = false;
          this.getPlan();
          this.planForm.reset();
          this.id = 0;
        }
      });
    }
  }

  getPlan() {
    this.loading = true;
    this.planService
      .getPlan(this.page, this.limit, this.sort, this.searchText)
      .subscribe((response) => {
        if (response.status === 200) {
          this.data = response.res.plans;
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
    this.page = event.first==0 ? 1 : (event.first/event.rows)+1;
    this.limit = event.rows;
    this.getPlan();
  }

  onSort(event: any) {
    this.sort = event.multisortmeta[0].order === 1 ? 'name' : '-name';
    this.getPlan();
  }
}
