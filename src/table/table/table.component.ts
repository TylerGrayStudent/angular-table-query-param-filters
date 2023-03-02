import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { DataService } from '../../services/data.service';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgSubDirective } from '../../directives/ngsub.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    NgSubDirective,
    MatButtonModule,
    MatSortModule,
  ],
})
export class TableComponent {
  PAGE_SIZE_OPTIONS = [5, 10];
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  data$ = this.service.data$;
  dataSource$ = this.data$.pipe(map((x) => x.results));
  paginator$ = this.data$.pipe(map((x) => x.paginator));
  filteredPagedData$ = this.route.queryParams.pipe(
    switchMap((queryParams) => {
      console.log('loading');
      const take = queryParams?.take ?? 10;
      const skip = queryParams?.skip ?? 0;
      const name = queryParams?.name;
      const symbol = queryParams?.symbol;
      const sort = queryParams?.sort;
      const direction = queryParams?.direction;
      return this.service.loadData(
        name,
        symbol,
        0,
        0,
        0,
        0,
        +skip,
        +take,
        sort,
        direction
      );
    })
  );
  filteredData$ = this.filteredPagedData$.pipe(map((x) => x.results));
  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  sortChange(event: Sort) {
    console.log(event);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: event.active,
        direction: event.direction,
      },
      queryParamsHandling: 'merge',
    });
  }
  handlePageEvent(event: PageEvent) {
    const take = event.pageSize;
    const skip = event.pageIndex * take;
    console.log(take, skip);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        take,
        skip,
      },
      queryParamsHandling: 'merge',
    });
  }
}
