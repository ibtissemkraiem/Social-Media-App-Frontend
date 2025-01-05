import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  newPostContent: string = ''; 

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();  
  }

  
  openPostModal(): void {
    const modal = document.getElementById('postModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

 
  closePostModal(): void {
    const modal = document.getElementById('postModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }


  createPost(): void {
    if (this.newPostContent.trim()) {
    
      console.log('New Post Content:', this.newPostContent);
      this.newPostContent = '';
      this.closePostModal(); 
    } else {
      alert('Please write something before posting!');
    }
  }
}
