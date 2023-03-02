import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  _data = new BehaviorSubject<PagedResultSet<Element>>(null);
  data$ = this._data.asObservable();
  constructor() {}
  loadData(
    nameFilter: string,
    symbolFilter: string,
    positionStartFilter: number,
    positionEndFilter: number,
    weightStartFitler: number,
    weightEndFitler: number,
    skip: number = 0,
    take: number = 10,
    sort: string = '',
    direction: 'asc' | 'desc' = 'asc'
  ) {
    let data = ELEMENT_DATA;
    if (nameFilter) {
      data = data.filter((x) =>
        x.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (symbolFilter) {
      data = data.filter((x) =>
        x.symbol.toLowerCase().includes(symbolFilter.toLowerCase())
      );
    }
    if (sort && direction) {
      const positive = direction === 'asc' ? 1 : -1;
      const negative = positive * -1;
      data.sort((a, b) => (a[sort] > b[sort] ? positive : negative));
    }
    const paginator = {
      filter: '',
      orderBy: '',
      skip,
      take,
      totalRecordCount: data.length,
    };
    data = data.slice(skip, skip + take);
    this._data.next({
      results: data,
      paginator,
    });
    return this.data$;
  }
}

const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface PagedResultSet<T> {
  paginator: Paginator;
  results: T[];
}

export const EmptyPagedResultSet: PagedResultSet<unknown> = {
  paginator: {
    filter: '',
    orderBy: '',
    skip: 0,
    take: 0,
    totalRecordCount: 0,
  },
  results: [],
};

export interface Paginator {
  filter: string;
  orderBy: string;
  skip: number;
  take: number;
  totalRecordCount: number;
}
