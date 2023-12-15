import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  role: string = '';
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.role = sessionStorage.getItem('role')!;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  }

}
