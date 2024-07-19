import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { AISolutionService } from '../../../service/ai-solution.service';

@Component({
  selector: 'app-prompts',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './prompts.component.html',
  styleUrl: './prompts.component.scss',
})
export class PromptsComponent implements OnInit {
  searchText: string = '';
  status: string | null = 'null';
  type: string | null = 'null';
  category: string | null = 'null';
  displayDialog: boolean = false;
  data: any[] = [];
  page: number = 1;
  limit: number = 10;
  sort: string = 'name';
  loading: boolean = false;
  totalRecords: number = 0;
  promptForm = new FormGroup({
    name: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    engine: new FormControl('', Validators.required),
    max_tokens: new FormControl(''),
    category: new FormControl('', Validators.required),
    persona: new FormControl('', Validators.required),
    prompt: new FormControl(''),
  });
  newQuestion: string = '';
  addquestions: any[] = [];
  questions: any[] = [];
  categories: any[] = [];
  personas: any[] = [];
  aISolutionService = inject(AISolutionService);
  id: number = 0;
  isSubmitted: boolean = false;


  ngOnInit(): void {
    this.getPrompts();
    this.getAllPersonasCategoriesQuestions();
  }

  getAllPersonasCategoriesQuestions() {
    this.aISolutionService.getAllPersonasCategoriesQuestions().subscribe((res: any) => {
      if (res.status == 200) {
        this.categories = res.res.categories;
        this.questions = res.res.questions;
        this.personas = res.res.personas;
      }
    })
  }

  addQuestion() {
    if (this.newQuestion) {
      const selectedQuestion = this.questions.find(q => q.id === Number(this.newQuestion));
      if (selectedQuestion) {
        this.addquestions.push(selectedQuestion);
        this.newQuestion = '';
      }
    }
  }

  getQuestionChange(event: any) {
    this.newQuestion = event.target.value;
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  onDragStart(event: DragEvent, index: number) {
    event.dataTransfer?.setData('index', index.toString());
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, newIndex: number) {
    const prevIndex = parseInt(event.dataTransfer?.getData('index') || '', 10);
    if (prevIndex >= 0 && prevIndex !== newIndex) {
      const movedItem = this.questions.splice(prevIndex, 1)[0];
      this.questions.splice(newIndex, 0, movedItem);
    }
  }

  editData(rowData: any) {
    this.displayDialog = true;
    this.id = rowData.id;
    this.promptForm.patchValue({
      name: rowData.name,
      status: rowData.status,
      type: rowData.type,
      description: rowData.description,
      engine: rowData.engine,
      max_tokens: rowData.max_tokens,
      category: rowData.category,
      persona: rowData.persona,
      prompt: rowData.prompt
  });
  if (rowData.question_list && rowData.question_list.length>0){
    this.addquestions=[];
    rowData.question_list.forEach((question:any) => {
    const questionShow = this.questions.find(e=>e.id==question.id);
      if (questionShow){
        this.addquestions.push(questionShow)
      }
    });
  }
  }

  deleteData(rowData: any) {
    this.aISolutionService.deletePersona(rowData.id).subscribe((res: any) => {
      if (res.status == 200) {
        this.getPrompts();
      }
    });
  }

  save() {
    if (this.promptForm.valid && this.addquestions.length) {
      const rawValue: any = this.promptForm.getRawValue();
      rawValue.id = this.id,
      rawValue.questionList = this.addquestions.map(e=>e.id);
      this.aISolutionService.addAndUpdatePrompts(rawValue).subscribe((res: any) => {
        if (res.status == 201) {
          this.getPrompts();
          this.close();
        }
      });
    }
  }
  
  close(){
    this.displayDialog = false;
    this.promptForm.reset();
    this.id = 0;
  }

  getPrompts() {
    this.loading = true;
    const status = (this.status && this.status !== '' && this.status !== 'null') ? this.status : null;
    const type = (this.type && this.type !== '' && this.type !== 'null') ? this.type : null;
    const category = (this.category && this.category !== '' && this.category !== 'null') ? this.category : null;
    this.aISolutionService.getPrompts(this.page, this.limit, this.sort, this.searchText, status, type, category).subscribe((response) => {
      if (response.status === 200) {
        this.data = response.res.prompts;
        this.data = this.data.map((item: any) => ({ ...item, checkbox: false }));
        this.totalRecords = response.res.total;
      }
      this.loading = false;
    });
  }

  onPageChange(event: any) {
    this.page = event.first == 0 ? 1 : (event.first / event.rows) + 1;
    this.limit = event.rows;
    this.getPrompts();
  }

  onSort(event: any) {
    this.sort = event.multisortmeta[0].order === 1 ? 'name' : '-name';
    this.getPrompts();
  }

  getCategory(option: any) {
    if (this.categories.length > 0) {
      return this.categories.find(e => e.id == option).name;
    }
  }
  
  getQuestionName(id:number){
    if (this.questions.length > 0) {
      return this.questions.find(e => e.id == id).question_text;
    }
  }

  getStatusClass(status: number): string {
    return Number(status) === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }
}
