import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-user-details',
  standalone: true,
  template: `
    <div class="card">
      <div class="font-semibold text-xl mb-4">Profile</div>
      <p>{{user.name}}</p>
    </div>
  `
})
export class UserDetailsComponent implements OnInit {
  user: Client;
  
  constructor(
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras?.state?.['client'];
  }

  ngOnInit() {
    console.log(this.user);
  }
}
