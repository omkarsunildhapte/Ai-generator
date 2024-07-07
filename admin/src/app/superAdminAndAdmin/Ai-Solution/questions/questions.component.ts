import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AISolutionService } from '../../../service/ai-solution.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    CheckboxModule,
    FormsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    ChipsModule
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit{
  searchText: string = '';
  isRequired: string = '';
  isType: string = '';
  displayDialog: boolean = false;
  data: any[] = [];
  page: number = 1;
  limit: number = 5;
  sort: string = 'name';
  loading: boolean = false;
  totalRecords: number = 0;
  questionForm = new FormGroup({
    question_text: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    required: new FormControl('', Validators.required),
    answer_length: new FormControl('', Validators.required),
    options: new FormControl(''),
  })
  isSubmitted: boolean = false;
  get formControls() { return this.questionForm.controls; }
  id: number = 0;
  categorieService = inject(AISolutionService);

  ngOnInit(): void {
    this.getQuestion();
  }

  editData(rowData: any) {
    this.displayDialog = true;
    this.id = rowData.id;
    this.questionForm.patchValue({
      question_text:rowData.question_text,
      type:rowData.type,
      required:rowData.required,
      answer_length:rowData.answer_length,
      options:rowData.options
    })
  }

  deleteData(rowData: any) {
    this.categorieService.deleteQuestion(rowData.id).subscribe((res: any) => {
      if(res.status==200){
        this.getQuestion();
      }
    });
  }

  save() {
    if (this.questionForm.invalid) {
        return;
      }
      let body:any=  this.questionForm.getRawValue();
      body.id = this.id
      this.categorieService.addAndUpdateQuestion(body).subscribe((res: any) => {
        if (res.status == 201) {
          this.displayDialog = false;
          this.getQuestion();
          this.questionForm.reset();
          this.id = 0;
        }
      });
  }

  getQuestion() {
    this.loading = true;
    this.categorieService.getQuestion(this.page, this.limit, this.sort, this.searchText,this.isRequired,this.isType).subscribe((response) => {
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
    this.page = event.page + 1;
    this.limit = event.rows;
    this.getQuestion();
  }

  onSort(event: any) {
    this.sort = event.multisortmeta[0].order === 1 ? 'name' : '-name';
    this.getQuestion();
  }

  toggleAllSelection(event: any) {
    const isChecked = event.checked;
    this.data = this.data.map((item: any) => ({
      ...item,
      checkbox: isChecked,
    }));
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

}
