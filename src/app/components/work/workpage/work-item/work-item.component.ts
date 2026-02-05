import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Workplace } from 'src/app/models/workplace.model';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrl: './work-item.component.scss',
  standalone: false
})
export class WorkItemComponent {
  @Input() public workplace: Workplace;

  constructor() {
    this.workplace =
    {
      Id: 1,
      CompanyName: '',
      Title: '',
      StartedAt: new Date('2021-04-16'),
      EndedAt: null,
      WorkImageUrl: '',
      WorkWebsite: ''
    }
  }
}
