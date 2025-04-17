import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StockService } from '../../../core/services/stock.services';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-stock-update',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './stock-update.component.html',
  styleUrl: './stock-update.component.css'
})
export class StockUpdateComponent {
  stockForm!: FormGroup;
  stockId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private stockService: StockService,
    private router: Router,
    private authService: AuthService
  ) { }



  ngOnInit(): void {
    this.stockId = +this.route.snapshot.paramMap.get('id')!;
    this.stockForm = this.fb.group({
      symbol: ['', [Validators.required, Validators.maxLength(10)]],
      companyName: ['', [Validators.required, Validators.maxLength(50)]],
      price: [0, [Validators.required, Validators.min(1)]],
      lastDiv: [0.001, [Validators.required, Validators.min(0.001)]],
      industry: ['', [Validators.required, Validators.maxLength(50)]],
      marketCap: [0, [Validators.min(1)]]
    });

    const role = this.authService.getRole();
    if (role !== 'Admin' && role !== 'User') {
      this.router.navigate(['/unauthorized']);
      return;
    };

    this.stockService.getStockById(this.stockId).subscribe(stock => {
      this.stockForm.patchValue(stock);
    });
  }

  onSubmit(): void {
    if (this.stockForm.valid) {
      this.stockService.updateStock(this.stockId, this.stockForm.value).subscribe({
        next: () => {
          alert('Stock updated successfully!');
          this.router.navigate(['/stock']);
        },
        error: (err) => {
          console.error('Update failed', err);
        }
      });
    }
  }
}
