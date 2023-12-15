import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRes } from 'src/app/models/user';
import { apiHost } from 'src/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,

  ) { }

  login(body: any): Promise<LoginRes> {
    return new Promise((resolve, reject) => {
      this.http.post(`${apiHost}/login`, body).subscribe((res: any) => {
        console.log('api res >>', res);
        resolve(res);
      })
    })

    // return new Promise((resolve, reject) => {
    //   this.http.post(`${apiHost}`, body, corsOption).subscribe({
    //     next: (res: any) => {
    //       resolve(res);
    //     }, error: (error: any) => {
    //       reject(error);
    //     }
    //   })
    // })

  }
}
