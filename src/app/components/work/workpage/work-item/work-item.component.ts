import { Component, Input } from '@angular/core';
import { Workplace } from 'src/app/models/workplace.model';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrl: './work-item.component.scss',
  standalone: false
})
export class WorkItemComponent {
@Input() public workplace: Workplace;

constructor(){
  this.workplace =
    {
      Id:1, 
      CompanyName:'KORE Software',
      Title:'Full-Stack Dev',
      StartedAt: new Date('2021-04-16'),
      EndedAt: null,
      WorkImageUrl: 'https://media.licdn.com/dms/image/v2/C4D0BAQFTE3IuE4f_sQ/company-logo_200_200/company-logo_200_200/0/1646949025950/koresoftware_logo?e=2147483647&v=beta&t=0zXTwbRykQG-TGWsde7TTytpqvPGdIeZQU8kHdczRgA',
      WorkWebsite: 'https://koresoftware.com/'
    }
}
}
