import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class FiltersComponent {
  name = '';
  symbol = '';
  constructor(private router: Router, private route: ActivatedRoute) {}
  onNameChange(name) {
    console.log(name);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        name,
      },
      queryParamsHandling: 'merge',
    });
  }
  onSymbolChange(symbol) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        symbol,
      },
      queryParamsHandling: 'merge',
    });
  }
}
