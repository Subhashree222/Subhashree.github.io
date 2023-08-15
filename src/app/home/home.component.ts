import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck{
  isAdmin: boolean = false;
  isUser: boolean = false;
  isVisitor: boolean = false;
  userDataName : any;
  

  constructor(private router: Router, private service: AuthService, private builder:FormBuilder){
    //this.getUserName();
  }
  ngOnInit(){
    // this.service.getAll().subscribe(res=>{
    //   this.userDataName = res;
    //   console.log(this.userDataName);
    // })
   
  }

  loginForm = this.builder.group({
    username: this.builder.control(''),
    password: this.builder.control('')
  });
  getUserName(id:any){
    this.service.getById(id).subscribe(res=>{
      this.userDataName = res;
      console.log(this.userDataName);
    })
  }
 
  
  ngDoCheck(): void {
    if(this.service.getUserRole() === 'admin'){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
    if(this.service.getUserRole() === 'user'){
      this.isUser = true;
    }else{
      this.isUser = false;
    }
    if(this.service.getUserRole() === 'visitor'){
      this.isVisitor = true;
    }else{
      this.isVisitor = false;
    }
  }

}
