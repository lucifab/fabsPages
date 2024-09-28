import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrl: './write-post.component.scss'
})
export class WritePostComponent {
  public myForm = new FormGroup({
    title: new FormControl("", Validators.required),
    body: new FormControl("")
  });

  constructor(){
  }

  public myTest(){
    console.log(this.myForm);
  }
}
