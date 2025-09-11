import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "./nav/nav";
import { Account } from './_services/account';
import { Home } from "./home/home";

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})

export class App implements OnInit {
  
  
  accountService = inject(Account);
  protected readonly title = signal('Client');
  

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);  
    this.accountService.currentUser.set(user);
  }



  
}