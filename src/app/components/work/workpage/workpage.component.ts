import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { Workplace } from 'src/app/models/workplace.model';

@Pipe({ name: 'sortByEndDate', standalone: false })
export class SortByEndDatePipe implements PipeTransform {
  transform(value: Workplace[], direction: 'asc' | 'desc' = 'asc'): Workplace[] {
    if (!Array.isArray(value)) return value;

    const flip = direction == 'asc' ? 1 : -1;

    return [...value].sort((a, b) => {
      if (!a.EndedAt && !b.EndedAt) {
        if (!a.StartedAt && !b.StartedAt) return 0;
        if (!a.StartedAt) return 1 * flip;
        if (!b.StartedAt) return -1 * flip;
        return flip * (new Date(a.StartedAt).getTime() - new Date(b.StartedAt).getTime());
      };
      if (!a.EndedAt) return 1 * flip;
      if (!b.EndedAt) return -1 * flip;
      return flip * (new Date(a.EndedAt).getTime() - new Date(b.EndedAt).getTime());
    });
  }
}


@Component({
  selector: 'app-workpage',
  templateUrl: './workpage.component.html',
  styleUrl: './workpage.component.scss',
  providers: [DatePipe],
  standalone: false
})
export class WorkpageComponent {

  constructor(private datePipe: DatePipe) {
  }

  protected dropdown: { [key: string]: boolean } = {
    philosophy: false
  };

  workplaces: Workplace[] = [
    {
      Id: 1,
      CompanyName: 'KORE Software',
      Title: 'Full-Stack Dev',
      StartedAt: new Date('2021-04-16'),
      EndedAt: new Date('2023-10-16'),
      WorkImageUrl: './assets/images/kore.png',
      WorkWebsite: 'https://koresoftware.com/'
    },
    {
      Id: 2,
      CompanyName: 'Two Circles',
      Title: 'Software Developer',
      StartedAt: new Date('2021-04-16'),
      EndedAt: null,
      WorkImageUrl: './assets/images/2c.png',
      WorkWebsite: 'https://twocircles.com/gb/'
    },
    {
      Id: 3,
      CompanyName: 'Kwantlen Polytechnic University',
      Title: 'Information Technology Diploma',
      StartedAt: new Date('2018-09-28'),
      EndedAt: new Date('2020-09-28'),
      WorkImageUrl: './assets/images/kpu.png',
      WorkWebsite: 'https://www.kpu.ca/'
    }
  ];
}
