import { Component, inject } from '@angular/core';
import { ConverterService } from '../../services/converter.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Conversion } from '../../../interfaces/conversion';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})
export class ConverterComponent {
  converterService = inject(ConverterService);

  selectedFromCurrency = "USD";
  selectedToCurrency = "USD";

  invalidAmount = false;
  limitExceeded = false;

  async convert(convertForm: NgForm){
    const {amount, fromCurrency, toCurrency} = convertForm.value;
    if (!amount || amount <= 0) {
      this.invalidAmount = true;
      return;
    }
    this.invalidAmount = false;
    this.limitExceeded = false;
    const convertData: Conversion = {amount: amount, from: fromCurrency, to: toCurrency};
    const res = await this.converterService.convert(convertData)
    if(res?.message == "Success") {
      Swal.fire({
        html: `
        <p style="color: #202122; font-size: 3rem; text-align: center; font-family: 'Segoe UI', sans-serif">${amount} ${fromCurrency} equivalen a <span style="font-weight: bold;">${res.data}</span> ${toCurrency}</p>`,
        confirmButtonColor: "#030303",
        confirmButtonText: "Entendido",
      });
    } else {
      this.limitExceeded = true
    }
  }
}
