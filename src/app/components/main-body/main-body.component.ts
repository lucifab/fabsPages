import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})
export class MainBodyComponent implements OnChanges {

  @Input() selectedContent: string;

  constructor(){
    this.selectedContent = 'blog';
  }

  ngOnChanges(changes: SimpleChanges): void { // Use ngOnChanges to monitor updates of @Input
    if(changes['selectedContent']){
      console.log("PREVIOUS:" + changes['selectedContent'].previousValue);
      console.log("CURRENT:" + changes['selectedContent'].currentValue);
      switch
    }
  }

}
