import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-affiliate',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './affiliate.component.html',
  styleUrl: './affiliate.component.scss'
})
export class AffiliateComponent implements OnInit {
  ngOnInit(): void {
    this.userService.getAffiliate().subscribe((res:any)=>{
      if(res.status==200){
        this.key = res.res
      }
    })
  }
  key:string='';
  userService=inject(UserService);
  submit(){
    this.userService.updateAffiliate(this.key).subscribe((res:any)=>{
      if(res.status==200){

      }
    })
  }
}
