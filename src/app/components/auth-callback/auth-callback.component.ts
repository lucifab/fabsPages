import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito-service.service';

@Component({
  selector: 'app-auth-callback',
  template: '',
  standalone: false
})
export class AuthCallbackComponent implements OnInit {
  private readonly cognitoService = inject(CognitoService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.cognitoService.checkAuth().subscribe({
      next: () => this.router.navigateByUrl('/blog'),
      error: () => this.router.navigateByUrl('/blog')
    });
  }
}
