import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
    standalone: true,
    imports: [CommonModule,FormsModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  newComment: string = ''; 
  newCommentMap: { [key: string]: string } = {};
  newPostContent: string = '';
  showModal: boolean = false; 

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe(
      (response: any) => {
        console.log(response); 
        if (Array.isArray(response.data)) {
          this.posts = response.data;  
        } else {
          console.error('Posts data is not an array!');
        }
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
    
    openPostModal(): void {
      this.showModal = true;
    }
  
  
    closePostModal(): void {
      this.showModal = false;
      this.newPostContent = '';  
    }
    createPost(): void {
      const trimmedContent = this.newPostContent.trim();
    
      if (!trimmedContent) {
        alert('Veuillez écrire quelque chose avant de publier!');
        return;
      }
    
     
      this.postService.createPost(trimmedContent).subscribe({
        next: (response) => {
          console.log('Publication réussie:', response);
          
          this.posts.unshift(response.data);
          this.closePostModal();
        },
        error: (err) => {
          console.error('Erreur lors de la création du post :', err);
          alert('Erreur lors de la publication. Veuillez réessayer.');
        }
      });
    }
  likePost(postId: string) {
    this.postService.likePost(postId).subscribe(() => this.loadPosts());
  }

 
  commentPost(postId: string): void {
    const comment = this.newCommentMap[postId]; // 
    if (comment && comment.trim()) {
      this.postService.commentPost(postId, comment).subscribe(() => {
        this.loadPosts(); 
        this.newCommentMap[postId] = ''; 
      });
    }
  }
}
