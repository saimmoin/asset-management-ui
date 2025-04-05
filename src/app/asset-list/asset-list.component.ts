// asset-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router for navigation

interface CategoryDetails {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
}

interface Asset {
  assetId: number;
  assetName: string;
  categoryId: number;
  categoryDetails: CategoryDetails;
  cost: number;
}

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css'],
  imports: [CommonModule, HttpClientModule], // Add HttpClientModule here
  standalone: true
})
export class AssetListComponent {
  assets: Asset[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.getAllAssets();
  } 

  getAllAssets() {
    this.http.get<Asset[]>("http://localhost:8080/api/v1/assets").subscribe({
      next: (result: Asset[]) => {
        this.assets = result;
      },
      error: (error) => {
        console.error('Error fetching assets:', error);
      }
    });
  }  

  ngOnInit(): void { }

  editAsset(asset: Asset): void {
    console.log('Edit asset:', asset);
    
    // Navigate to the edit component with category data
    this.router.navigate(['/addAssets'], {
      state: { asset }
    });
  }

}