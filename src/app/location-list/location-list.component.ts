import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

// Define the Location interface
interface Location {
  locationId: number;
  locationName: string;
  locationCode: string;
}

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
  imports: [CommonModule, HttpClientModule],
  standalone: true
})
export class LocationListComponent implements OnInit {
  locations: Location[] = [];
  loading: boolean = true;
  private apiUrl = 'http://localhost:8080/api/v1/locations';
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {
    this.loading = true;
    this.http.get<Location[]>(this.apiUrl).subscribe({
      next: (result: Location[]) => {
        this.locations = result;
        console.log('Locations loaded:', this.locations);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching locations:', error);
        this.loading = false;
      }
    });
  }

  editLocation(location: Location) {
    console.log('Edit location:', location);
    // Implement edit functionality here
    this.router.navigate(['/addLocation'], {
      state: { location }
    });
  }
}