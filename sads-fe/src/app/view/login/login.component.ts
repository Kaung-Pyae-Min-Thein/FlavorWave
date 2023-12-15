
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRes } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';

// export const matchpassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

//   let password = control.get('password');
//   let confirmpassword = 'flowerwave'
//   if (password && confirmpassword && password?.value != confirmpassword) {
//     return {
//       passwordmatcherror: true
//     }
//   }
//   return null;
// }


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  userError = false;
  pwError = false;

  email = '';
  pw = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  }
    // , { validators: matchpassword }
  );


  async submitLoginForm() {

    const user = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    }

    const email = this.loginForm.controls['email'].value;
    const pw = this.loginForm.controls['password'].value;

    const emails: any[] = ['client@gmail.com', 'sales@gmail.com', 'factory@gmail.com', 'warehouse@gmail.com', 'logistic@gmail.com', 'admin@gmail.com']

    const i = emails.findIndex(e => {
      return e == email;
    })

    if (i < 0) {
      this.userError = true;
    }

    if (user.password != '' && user.password != "flowerwave") {
      this.pwError = true;
    }

    // call api and create preorder
    const res: LoginRes = await this.auth.login(user);
    sessionStorage.setItem('token', res.token);
    sessionStorage.setItem('role', res.user.role);
    // await this.auth.login(user);

    this.checkRoleAndNavigate();
  }

  removeError() {

    this.userError = false
    this.pwError = false;
  }

  checkRoleAndNavigate() {
    const role = sessionStorage.getItem('role');
    let url = '';

    switch (role) {
      case 'client': {
        url = 'preorder';
        break;
      }
      case 'sales': {
        url = 'sales';
        break;
      }
      case 'warehouse': {
        url = 'warehouse'
        break;
      }
      case 'factory': {
        url = 'factory'
        break;
      }
      case 'logistic': {
        url = 'logistics'
        break;
      }
      case 'admin': {
        url = 'admin'
        break;
      }
      default: {
        url = 'sales'
        break;
      }
    }

    this.router.navigateByUrl(url);
  }



}
