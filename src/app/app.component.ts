import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  private readonly router = inject(Router);

  title = 'fabsPage';
  selectedContent = 'blog';

  ngOnInit(): void {
    if (this.router.url.startsWith('/auth/callback')) {
      return;
    }

    this.cognitoService.checkAuth().subscribe();
  }
}
