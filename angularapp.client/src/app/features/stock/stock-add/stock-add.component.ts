import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../../../core/services/stock.services';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-stock-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './stock-add.component.html',
  styleUrl: './stock-add.component.css'
})
export class StockAddComponent {
  stockForm: FormGroup;

  constructor(private fb: FormBuilder, private stockService: StockService, private router: Router) {
    this.stockForm = this.fb.group({
      symbol: ['', Validators.required],
      companyName: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      lastDiv: [0],
      industry: [''],
      marketCap: [0]
    });
  }

  onSubmit(): void {
    if (this.stockForm.valid) {
      this.stockService.addStock(this.stockForm.value).subscribe({
        next: () => {
          alert('Stock added successfully!');
          this.router.navigate(['/stock']);
        },
        error: (err) => {
          console.error('Error adding stock', err);
        }
      });
    }
  }
}
