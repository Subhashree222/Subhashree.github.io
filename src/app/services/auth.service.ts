import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApi = 'http://localhost:3000/user';

  constructor( private http: HttpClient) { }

  //return alldata from api
  getAll(){
    return this.http.get(this.baseApi);
  }

  //get all roles
  getAllRole(){
    return this.http.get("http://localhost:3000/role");
  }
  //get specific Id
  getById(id:any){
    return this.http.get(this.baseApi+'/'+id);
  }

  //get specific inputdata register user
  registerData(inputdata:any){
    return this.http.post(this.baseApi,inputdata);
  }

  //update specific id and input data(update user)
  updateData(id:any, inputdata:any){
    return this.http.put(this.baseApi+'/'+id,inputdata);
  }

  //get userName fron sessionstorage
  isLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  //get userName fron sessionstorage
  getUserRole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  
}
