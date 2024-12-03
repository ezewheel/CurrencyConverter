import { Component, inject } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss'
})
export class SubscriptionsComponent {
  subscriptionService = inject(SubscriptionService);

  constructor() {
    this.subscriptionService.getSubscriptions();
  }

  isSubscribed() {
    return localStorage.getItem('role');
  }

  getSubscriptionType() {
    return localStorage.getItem('role');
  }

  async subscribe(subscriptionForm: NgForm) {
    const {subscriptionType} = subscriptionForm.value;
    const res = await this.subscriptionService.subscribe(subscriptionType)
    if(res?.message == "Success") {
      Swal.fire({
        html: `
        <p style="color: #202122; font-size: 3rem; text-align: center; font-family: 'Segoe UI', sans-serif">Te has suscrito a la suscripción <span style="font-weight: bold;">${subscriptionType}</span></p>`,
        confirmButtonColor: "#030303",
        confirmButtonText: "Entendido",
      });
    }

  }
}
