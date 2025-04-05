// category-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router for navigation

// Define the Category interface
interface Category {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
}

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  imports: [CommonModule, HttpClientModule],
  standalone: true
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  loading: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.loading = true;
    this.http.get<Category[]>("http://localhost:8080/api/v1/categories").subscribe({
      next: (result: Category[]) => {
        this.categories = result;
        console.log('Categories loaded:', this.categories);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.loading = false;
      }
    });
  }

 editCategory(category: Category): void {
    console.log('Edit category:', category);
    
    // Navigate to the edit component with category data
    this.router.navigate(['/addCategory'], {
      state: { category }
    });
  }
}