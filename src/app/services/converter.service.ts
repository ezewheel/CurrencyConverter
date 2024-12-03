import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../../enviroment/enviroment';
import { Currency, CurrencyResponse } from '../../interfaces/currency';
import { Conversion, ConversionResponse } from '../../interfaces/conversion';
import { ConversionHistoryService } from './conversion-history.service';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  conversionHistoryService = inject(ConversionHistoryService);

  constructor() { 
    this.getCurrencies();
  }

  currencies: Currency[] = [];

  async getCurrencies(){
    const res = await fetch(apiUrl + 'currency/conversions',{
      method: 'GET',
      headers: {
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")

      }
    })
    
    if(res.status !== 200) return;

    const resJson: CurrencyResponse = await res.json();
    this.currencies = resJson.data;
  }

  async convert(convertData: Conversion){
    const res = await fetch(apiUrl + 'conversion',{
      method: 'POST',
      headers: {
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")

      },
      body: JSON.stringify(convertData),
    })
    
    if(res.status !== 200) return;

    const resJson: ConversionResponse = await res.json();
    this.conversionHistoryService.getConversionHistory();
    return resJson;
  }
}
