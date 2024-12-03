import { Component, inject } from '@angular/core';
import { ConversionHistoryService } from '../../services/conversion-history.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  conversionHistoryService = inject(ConversionHistoryService);
}
