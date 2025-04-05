// supplier-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

// Define the Supplier interface
interface Supplier {
  supplierId: number;
  supplierName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
  imports: [CommonModule, HttpClientModule], // Add HttpClientModule for HTTP requests
  standalone: true
})
export class SupplierListComponent implements OnInit {
  suppliers: Supplier[] = [];
  loading: boolean = true;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  getAllSuppliers() {
    this.loading = true;
    this.http.get<Supplier[]>("http://localhost:8080/api/v1/suppliers").subscribe({
      next: (result: Supplier[]) => {
        this.suppliers = result;
        console.log('Suppliers loaded:', this.suppliers);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching suppliers:', error);
        this.loading = false;
      }
    });
  }

  editSupplier(supplier: Supplier): void {
    console.log('Edit supplier:', supplier);
    // Implement edit functionality here
    this.router.navigate(['/addSupplier'], {
      state: { supplier }
    });
  }
}