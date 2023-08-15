import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit{
  roleList:any;
  editData: any;
  //data: any;

  constructor(private builder:FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
    private dialogref: MatDialogRef<UpdatepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.updateUser();
    }
  ngOnInit(): void {
    this.service.getAllRole().subscribe(res=>{
      this.roleList = res;
    })
    if(this.data.usercode !=null && this.data.usercode !=''){
      this.loaduserdata(this.data.usercode);
    }
  }


    registerForm = this.builder.group({
      id: this.builder.control(''),
      name: this.builder.control(''),
      password: this.builder.control(''),
      email: this.builder.control(''),
      role: this.builder.control('', Validators.required),
      isActive: this.builder.control(false)
    });

    loaduserdata(code:any){
      this.service.getById(code).subscribe(res=>{
        this.editData = res;
        console.log(this.editData);
        this.registerForm.setValue({
          id: this.editData.id, name: this.editData.name,
          password: this.editData.password, email: this.editData.email, 
          role: this.editData.role, isActive: this.editData.isActive
        });
      })
    }
    updatedData:any;
    updateUser() {
      if(this.registerForm.valid){
        this.service.updateData(this.registerForm.value.id, this.registerForm.value).subscribe(res=>{
          this.updatedData = res;
          console.log(this.updatedData);
          this.toastr.success('Updated successfully.');
          this.dialogref.close();
        })
      }else{
        this.toastr.warning('Please select Role');
      }
      
      // this.service.updateData(this.registerForm.value.id, this.registerForm.value).subscribe(res => {
      //   this.toastr.success('Updated successfully.');
      //   this.dialogref.close();
      // });
    }
}
