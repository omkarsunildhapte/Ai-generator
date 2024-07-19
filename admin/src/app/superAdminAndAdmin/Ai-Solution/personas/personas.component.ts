import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { AISolutionService } from '../../../service/ai-solution.service';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    TabViewModule,
    ReactiveFormsModule
  ],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.scss',
})
export class PersonasComponent implements OnInit{
  categorieService = inject(AISolutionService);
  searchText: string = '';
  displayDialog: boolean = false;
  data: any[] = [];
  limit: number = 10;
  totalRecords: number = 0;
  loading: boolean = false;
  page: number = 1;
  sort: string = 'name';
  uploadedFiles: { name: string, base64: string }[] = [];
  id: number = 0;
  personaForm = new FormGroup({
    name: new FormControl('', Validators.required),
    describe: new FormControl(''),
    website: new FormControl(''),
  })
  isSubmitted: boolean = false;
  
  ngOnInit(): void {
    this.getPersona()
  }

  editData(rowData: any) {
    this.displayDialog = true;
    this.uploadedFiles = rowData.files ? rowData.file : [];
    this.personaForm.patchValue({
      name : rowData.name,
      describe:rowData.description,
      website:rowData.website
    })
    this.id = rowData.id;
  }

  deleteData(rowData: any) {
    this.categorieService.deletePersona(rowData.id).subscribe((res: any) => {
      if(res.status==200){
        this.getPersona();
      }
    });
  }

  save() {
    if (this.personaForm.valid) {
      const rawValue = this.personaForm.getRawValue();
      const body = {
        name:  rawValue.name,
        description: rawValue.describe,
        files: this.uploadedFiles,
        website:rawValue.website,
        id: this.id,
      };
      this.categorieService.addAndUpdatePersona(body).subscribe((res: any) => {
        if (res.status == 201) {
          this.getPersona();
         this.close();
        }
      });
    }
  }
  close(){
    this.displayDialog = false;
    this.personaForm.reset();
    this.id = 0;
    this.uploadedFiles= [];
  }

  getPersona() {
    this.loading = true;
    this.categorieService.getPersona(this.page, this.limit, this.sort, this.searchText).subscribe((response) => {
        if (response.status === 200) {
          this.data = response.res.personas;
          this.data = this.data.map((item: any) => ({...item,checkbox: false}));
          this.totalRecords = response.res.total;
        }
        this.loading = false;
      });
  }

  onPageChange(event: any) {
    this.page = event.first==0 ? 1 : (event.first/event.rows)+1;
    this.limit = event.rows;
    this.getPersona();
  }

  onSort(event: any) {
    this.sort = event.multisortmeta[0].order === 1 ? 'name' : '-name';
    this.getPersona();
  }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes: string[] = ['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (file && allowedFileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.uploadedFiles.push({ name: file.name, base64: base64String });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Invalid file type. Allowed types are: .pdf, .docx, .xlsx');
    }
  }

  deleteFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  getFile(base64: string,filename:string): void {
    const link = document.createElement('a');
    link.href = `data:application/octet-stream;base64,${base64}`;
    link.download = filename; 
    link.click();
  }
}
