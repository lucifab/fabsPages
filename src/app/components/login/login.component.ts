import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CognitoService } from 'src/app/services/cognito-service.service';

@Component({
  selector: 'app-login',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public readonly cognitoService = inject(CognitoService);
  tokenCopyMessage = '';

  async copyAccessToken(): Promise<void> {
    const accessToken = await firstValueFrom(this.cognitoService.getAccessToken());

    if (!accessToken) {
      this.tokenCopyMessage = 'No access token available';
      return;
    }

    await navigator.clipboard.writeText(accessToken);
    this.tokenCopyMessage = 'Access token copied';
  }
}
