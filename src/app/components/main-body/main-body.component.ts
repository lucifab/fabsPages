import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})
export class MainBodyComponent {

  @Input() selectedContent: string;

  constructor(){
    this.selectedContent = 'blog';
  }

}
