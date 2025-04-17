import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Stock, StockService } from '../../core/services/stock.services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit {
  stocks: Stock[] = [];
  isLoading = true;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.loadStocks();
  }

  queryParams = {
    pageNumber: 1,
    pageSize: 5,
    companyName: '',
    symbol: '',
    sortBy: 'Symbol',
    isDecsending: false
  };

  totalPages = 0;

  loadStocks(): void {
    this.isLoading = true;
    this.stockService.getStocks(this.queryParams).subscribe({
      next: (data) => {
        this.stocks = data;
        this.isLoading = false;

        // If you return total count from backend, compute pages
        // this.totalPages = Math.ceil(data.totalCount / this.queryParams.pageSize);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  onSearchChange(search: string): void {
    this.queryParams.companyName = search;
    this.queryParams.pageNumber = 1;
    this.loadStocks();
  }

  nextPage(): void {
    this.queryParams.pageNumber++;
    this.loadStocks();
  }

  prevPage(): void {
    if (this.queryParams.pageNumber > 1) {
      this.queryParams.pageNumber--;
      this.loadStocks();
    }
  }

  confirmDelete(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this stock?');
    if (confirmDelete) {
      this.stockService.deleteStock(id).subscribe({
        next: () => {
          alert('Stock deleted successfully.');
          this.loadStocks(); // Reload the table
        },
        error: (err) => {
          console.error('Delete failed', err);
          alert('Failed to delete the stock.');
        }
      });
    }
  }
}
