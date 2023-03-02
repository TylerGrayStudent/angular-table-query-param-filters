import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { TableComponent } from './table/table/table.component';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { FiltersComponent } from './table/filters/filters.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, TableComponent, FiltersComponent],
  templateUrl: 'main.component.html',
})
export class App {
  name = 'Angular';
}

const appRoutes: Routes = [];

bootstrapApplication(App, {
  providers: [provideRouter(appRoutes), provideAnimations()],
});
