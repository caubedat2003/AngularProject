import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Stock {
  id: number;
  symbol: string;
  companyName: string;
  price: number;
  lastDiv: number;
  industry: string;
  marketCap: number;
}

@Injectable({
  providedIn: 'root'
})

export class StockService {
  private apiUrl = 'https://localhost:7000/api/Stock';

  constructor(private http: HttpClient) { }

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl);
  }

  addStock(stock: Partial<Stock>): Observable<Stock> {
    return this.http.post<Stock>(this.apiUrl, stock);
  }
}
