import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AISolutionService } from '../../../service/ai-solution.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    ChipsModule,
    ToastModule
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class QuestionsComponent implements OnInit {
  confirmationService = inject(ConfirmationService)
  messageService = inject(MessageService)
  questionServies = inject(AISolutionService);
  searchText: string = '';
  isRequired: string|null = null;
  isType: string|null = null;
  displayDialog: boolean = false;
  data: any[] = [];
  page: number = 1;
  limit: number = 10;
  sort: string = 'question_text';
  loading: boolean = false;
  totalRecords: number = 0;
  questionForm = new FormGroup({
    question_text: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    required: new FormControl('', Validators.required),
    answer_length: new FormControl('', Validators.required),
    options: new FormControl(''),
  });
  typeOptions = [
    { value: '1', label: 'Single Line' },
    { value: '2', label: 'Multi Line' },
    { value: '3', label: 'Select' },
    { value: '4', label: 'Live Crawling' },
    { value: '5', label: 'File' }
  ];
  isSubmitted: boolean = false;
  get formControls() { return this.questionForm.controls; }
  id: number = 0;

  ngOnInit(): void {
    this.getQuestion();
  }

  editData(rowData: any) {
    this.displayDialog = true;
    this.id = rowData.id;
    this.questionForm.patchValue({
      question_text: rowData.question_text,
      type: rowData.type,
      required: rowData.required,
      answer_length: rowData.answer_length,
      options: rowData.options
    })
  }

  deleteData(rowData: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.questionServies.deleteQuestion(rowData.id).subscribe((res: any) => {
          if (res.status == 200) {
            this.getQuestion();
          }
        });
      }
    });
  }

  save() {
    if (this.questionForm.invalid) {
      return;
    }
    let body: any = this.questionForm.getRawValue();
    body.id = this.id
    this.questionServies.addAndUpdateQuestion(body).subscribe((res: any) => {
      if (res.status == 201) {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: res.res.message });
        this.getQuestion();
       this.close();
      }
    });
  }

  close(){
    this.displayDialog = false;
    this.questionForm.reset();
    this.id = 0;
  }

  getQuestion() {
    this.loading = true;
    const required = (this.isRequired && this.isRequired !== '' && this.isRequired !== 'null') ? this.isRequired : null;
    const type = (this.isType && this.isType !== '' && this.isType !== 'null') ? this.isType : null;
    this.questionServies.getQuestion(this.page, this.limit, this.sort, this.searchText, required, type).subscribe((response) => {
      if (response.status === 200) {
        this.data = response.res.questions;
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
    this.page = event.first == 0 ? 1 : (event.first / event.rows) + 1;
    this.limit = event.rows;
    this.getQuestion();
  }

  onSort(event: any) {
    this.sort = event.multisortmeta[0].order === 1 ? 'question_text' : '-question_text';
    this.getQuestion();
  }

  getValid(): void {
    const rawValue = this.questionForm.getRawValue();
    if (rawValue.type === '3') {
      this.questionForm.get('options')?.setValidators(Validators.required);
    } else {
      this.questionForm.get('options')?.clearValidators();
    }
    this.questionForm.get('options')?.updateValueAndValidity();
  }

  getType(type:number){
    return this.typeOptions.find(e=>e.value==String(type)) ?this.typeOptions.find(e=>e.value==String(type))?.label :'' ;
  }
  getCellColorClass(type: number): string {
    switch (type) {
      case 1: return 'bg-blue-200';
      case 2: return 'bg-green-200';
      case 3: return 'bg-yellow-200';
      case 4: return 'bg-red-200';
      case 5: return 'bg-purple-200';
      default: return '';
    }
  }
  getStatusClass(status: number): string {
    return status === 1
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  }

}
