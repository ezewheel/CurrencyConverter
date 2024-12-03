import { Injectable } from '@angular/core';
import { apiUrl } from '../../enviroment/enviroment';
import { SubscribeResponse, SubscriptionResponse } from '../../interfaces/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor() { 
    this.getSubscriptions();
  }

  subscriptions: string[] = [];

  async getSubscriptions(){
    const res = await fetch(apiUrl + 'user',{
      method: 'GET',
      headers: {
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
    })
    
    if(res.status !== 200) return;

    const resJson: SubscriptionResponse = await res.json();
    this.subscriptions = resJson.data;
  }

  async subscribe(subscriptionType: string){
    const res = await fetch(apiUrl + 'user/' + subscriptionType,{
      method: 'PUT',
      headers: {
        'Content-type':'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")

      },
    })
    if(res.status !== 200) return;
    

    const resJson: SubscribeResponse = await res.json();
    localStorage.setItem("role", subscriptionType);
    this.getSubscriptions();
    return resJson;
  }
}
