// employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

// Define the LocationDetails interface
interface LocationDetails {
  locationId: number;
  locationName: string;
  locationCode: string;
}

// Update the Employee interface to match the new API response
interface Employee {
  employeeId: number;
  employeeName: string;
  locationId: number;
  locationDetails: LocationDetails;
  contactEmail: string;
  contactPhone: string;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  imports: [CommonModule, HttpClientModule],
  standalone: true
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading: boolean = true;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.loading = true;
    this.http.get<Employee[]>("http://localhost:8080/api/v1/employees").subscribe({
      next: (result: Employee[]) => {
        this.employees = result;
        console.log('Employees loaded:', this.employees);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.loading = false;
      }
    });
  }

  editEmployee(employee: Employee): void {
    console.log('Edit employee:', employee);
    // Add your edit functionality here
    this.router.navigate(['/addEmployee'], {
      state: { employee }
    });
  }
}