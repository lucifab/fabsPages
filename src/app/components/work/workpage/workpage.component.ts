import { DatePipe } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { Workplace } from 'src/app/models/workplace.model';

@Pipe({ name: 'sortByEndDate' })
export class SortByEndDatePipe implements PipeTransform {
  transform(value: Workplace[], direction: 'asc' | 'desc' = 'asc'): Workplace[] {
    if (!Array.isArray(value)) return value;

    const flip = direction == 'asc' ? -1 : 1;

    return [...value].sort((a, b) => {
      if (!a.EndedAt && !b.EndedAt) return 0;
      if (!a.EndedAt) return -1 * flip;
      if (!b.EndedAt) return 1 * flip;
      return flip *(new Date(a.EndedAt).getTime() - new Date(b.EndedAt).getTime());
    });
  }
}


@Component({
  selector: 'app-workpage',
  templateUrl: './workpage.component.html',
  styleUrl: './workpage.component.scss',
  providers: [DatePipe]
})
export class WorkpageComponent {

  constructor(private datePipe: DatePipe) {
  }

  workplaces: Workplace[] = [
    {
      Id: 1,
      CompanyName: 'KORE Software',
      Title: 'Full-Stack Dev',
      StartedAt: new Date('2021-04-16'),
      EndedAt: new Date('2023-10-16'),
      WorkImageUrl: 'https://media.licdn.com/dms/image/v2/C4D0BAQFTE3IuE4f_sQ/company-logo_200_200/company-logo_200_200/0/1646949025950/koresoftware_logo?e=2147483647&v=beta&t=0zXTwbRykQG-TGWsde7TTytpqvPGdIeZQU8kHdczRgA',
      WorkWebsite: 'https://koresoftware.com/'
    },
    {
      Id: 2,
      CompanyName: 'Two Circles',
      Title: 'Software Developer',
      StartedAt: new Date('2021-04-16'),
      EndedAt: null,
      WorkImageUrl: 'https://www.liberty-cf.com/images/8f0596bf-52b6-4753-8eef-355af9e8c179/sp/two-circles-logo-transparent-new.webp',
      WorkWebsite: 'https://twocircles.com/gb/'
    },
    {
      Id: 3,
      CompanyName: 'Kwantlen Polytechnic University',
      Title: 'Information Technology Diploma',
      StartedAt: new Date('2018-09-28'),
      EndedAt: new Date('2020-09-28'),
      WorkImageUrl: 'https://www.kpu.ca/themes/custom/kpu/logo.svg',
      WorkWebsite: 'https://www.kpu.ca/'
    }
  ];

}
