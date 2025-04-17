import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Stock, StockService } from '../../core/services/stock.services';

@Component({
  selector: 'app-stock',
  imports: [CommonModule, RouterModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit {
  stocks: Stock[] = [];
  isLoading = true;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getStocks().subscribe({
      next: (data) => {
        this.stocks = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load stocks', err);
        this.isLoading = false;
      }
    });
  }
}
