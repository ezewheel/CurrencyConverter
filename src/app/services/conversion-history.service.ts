import { Injectable } from '@angular/core';
import { apiUrl } from '../../enviroment/enviroment';
import { ConversionHistory, ConversionHistoryResponse } from '../../interfaces/conversion';

@Injectable({
  providedIn: 'root'
})
export class ConversionHistoryService {

  constructor() {
    this.getConversionHistory();
  }

  conversions: ConversionHistory[] = [];

  async getConversionHistory(){
    const res = await fetch(apiUrl + 'conversion',{
      method: 'GET',
      headers: {
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")

      },
    })
    
    if(res.status !== 200) return;

    const resJson: ConversionHistoryResponse = await res.json();
    this.conversions = resJson.data;
  }
}
