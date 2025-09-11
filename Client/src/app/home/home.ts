import { Component, inject, OnInit, signal } from '@angular/core';
import { Register } from "../register/register";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  http = inject(HttpClient);
  registerMode = false;
  users = signal<any[]>([]);

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

    getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users.set(response as any[]),
      error: error => console.log(error),
      complete: () => console.log('Request completed')
    })
  }
}
