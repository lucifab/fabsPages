import { trigger, state, style, AUTO_STYLE, transition, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';

const DEFAULT_DURATION = 100;

@Component({
  selector: 'app-speech-bubble',
  templateUrl: './speech-bubble.component.html',
  styleUrl: './speech-bubble.component.scss',
  standalone: false,
  animations: [
    trigger('collapse', [
      state('false', style({ height: 150, visibility: AUTO_STYLE })),
      state('true', style({ height: 0, visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in-out')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-in-out'))
    ]),
    trigger('fadeText', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(DEFAULT_DURATION + 'ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(DEFAULT_DURATION + 'ms ease-out', style({ opacity: 0 })),
      ]),
    ])
  ]
})
export class SpeechBubbleComponent {

  public personIdSelected: number = 3;
  public showMessage: boolean = true;
  @Input() public persons = [{
    id: 0
    , name: 'Ken Da Sheep'
    , relationship: 'Friend'
    , image: 'https://i.ytimg.com/vi/XtY_qRIYqtM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAetPQi9Qdta1-OuN0kO56bKSTl-w'
    , message: 'No I\'m listening to the song is this Blackpink'
  },
  {
    id: 1
    , name: 'Axen'
    , relationship: 'Friend'
    , image: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/sneaky-cat-kathleen-illes.jpg'
    , message: 'MROW'
  },
  {
    id: 2
    , name: 'Eric'
    , relationship: 'Bubu Baby'
    , image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVK7Ci9FgNEQd6pVCZ_b9GTJoaUosHYgvZWQ&s'
    , message: 'No better than a sugy glidy'
  },
  {
    id: 3
    , name: 'Fabs'
    , relationship: 'Queen'
    , image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRsNEtwJdvPo5fDdmWbatR8S6i-VpcKgMLQ&s'
    , message: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
  }
  ];
  public message: string = this.persons[this.personIdSelected].message;

  public displayMessage(person: any) {
    this.showMessage = false;
    this.personIdSelected = person.id;

    setTimeout(() => {
      this.message = person.message;
      this.showMessage = true;
    }, DEFAULT_DURATION)

  }
}
