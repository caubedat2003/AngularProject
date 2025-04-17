import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
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

  getStocks(query: {
    pageNumber?: number;
    pageSize?: number;
    companyName?: string;
    symbol?: string;
    sortBy?: string;
    isDecsending?: boolean;
  } = {}): Observable<any> {
    let params = new HttpParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<any>(this.apiUrl, { params });
  }

  addStock(stock: Partial<Stock>): Observable<Stock> {
    return this.http.post<Stock>(this.apiUrl, stock);
  }

  updateStock(id: number, stock: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, stock);
  }

  getStockById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
