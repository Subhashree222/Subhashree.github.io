import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements AfterViewInit{
  constructor(private builder:FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
    private dialog:MatDialog){
      this.loadUser();
    }
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    ngAfterViewInit(): void {
  
    }

  userList : any;
  dataSource: any;
  displayedColumns:string[]=['username','name','email','role','status','action'];
  loadUser(){
    this.service.getAll().subscribe(res=>{
      this.userList = res;
      console.log(res);
      this.dataSource = new MatTableDataSource(this.userList);
    })
  }
  
  updatePopup(code:any){
    console.log(code);
    this.openDailog('1000ms','600ms',code);
  }
  openDailog(enteranimation:any, exitanimation:any, code:any){
    const popup = this.dialog.open(UpdatepopupComponent,{
      enterAnimationDuration:enteranimation,
      exitAnimationDuration:exitanimation,
      width:'20%',
      data:{
        usercode:code
      }
    });
    popup.afterClosed().subscribe(res=>{
      console.log(res);
      this.loadUser();
    })
  }

}
