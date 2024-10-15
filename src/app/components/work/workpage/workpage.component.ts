import { Component } from '@angular/core';
import { Workplace } from 'src/app/models/workplace.model';

@Component({
  selector: 'app-workpage',
  templateUrl: './workpage.component.html',
  styleUrl: './workpage.component.scss'
})
export class WorkpageComponent {
  workplaces: Workplace[] = [
    {
      Id:1, 
      CompanyName:'KORE Software',
      Title:'Full-Stack Dev',
      StartedAt: new Date('2021-04-16'),
      EndedAt: null,
      WorkImageUrl: 'https://media.licdn.com/dms/image/v2/C4D0BAQFTE3IuE4f_sQ/company-logo_200_200/company-logo_200_200/0/1646949025950/koresoftware_logo?e=2147483647&v=beta&t=0zXTwbRykQG-TGWsde7TTytpqvPGdIeZQU8kHdczRgA',
      WorkWebsite: 'https://koresoftware.com/'
    },
    {
      Id:2, 
      CompanyName:'Kwantlen Polytechnic University',
      Title:'Information Technology Diploma',
      StartedAt: new Date('2019-09-28'),
      EndedAt: new Date('2021-09-28'),
      WorkImageUrl: 'https://www.kpu.ca/themes/custom/kpu/logo.svg',
      WorkWebsite: 'https://www.kpu.ca/'
    }
  ];

}
