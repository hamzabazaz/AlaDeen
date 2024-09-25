import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:9090";

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  constructor(private httpClient: HttpClient,
    private userAuthService: UserAuthService) { }





  public register(registerData: any){
    return this.httpClient.post(this.PATH_OF_API+'/registerNewUser',registerData);
  }







  public login(loginData: any) {
    return this.httpClient.post(this.PATH_OF_API + "/authenticate", loginData, { headers: this.requestHeader });
  }



  public forUser() {
    return this.httpClient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }




  public forAdmin() {
    return this.httpClient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }


  

  public roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: any[] = this.userAuthService.getRoles();

    if (userRoles != null && userRoles.length > 0) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            break;  // Exit the inner loop once a match is found
          }
        }
        if (isMatch) {
          break;  // Exit the outer loop once a match is found
        }
      }
    }
    return isMatch;
  }
}
