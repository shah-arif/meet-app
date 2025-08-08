import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})

export class App implements OnInit {
  
  http = inject(HttpClient);
  protected readonly title = signal('Client');
  users = signal<any[]>([]);

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users.set(response as any[]),
      error: error => console.log(error),
      complete: () => console.log('Request completed')
    })
  }

  
}