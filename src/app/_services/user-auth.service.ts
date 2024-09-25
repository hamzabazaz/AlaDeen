import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: any[]) {  // Changed the type from [] to any[]
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): any[] {  // Changed the type from [] to any[]
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];  // Handle null case
  }

  public setToken(jwtToken: string) {
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken(): string | null {  // Return string | null to handle null case
    return localStorage.getItem('jwtToken');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return !!this.getRoles().length && !!this.getToken();  // Ensure both roles and token exist
  }

  public isAdmin(){
    const roles:any[]=this.getRoles();
    return roles[0].roleName==='Admin';
  }

  public isUser(){
    const roles:any[]=this.getRoles();
    return roles[0].roleName==='User';
  }
}
