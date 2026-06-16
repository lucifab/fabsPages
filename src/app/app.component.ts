import { Component, OnInit, inject } from '@angular/core';
import { MoveDirection, ClickMode, HoverMode, OutMode, Engine, Container } from "tsparticles-engine";
import { CognitoService } from './services/cognito-service.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  private readonly cognitoService = inject(CognitoService);

  title = 'fabsPage';
  selectedContent = 'blog';

  ngOnInit(): void {
    this.cognitoService.checkAuth();
  }
}
