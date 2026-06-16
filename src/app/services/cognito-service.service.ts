import { inject, Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CognitoUserData } from '../models/cognito-user-data.model';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  configuration$ = this.oidcSecurityService.getConfiguration();

  userData$ = this.oidcSecurityService.userData$;

  userProfile$ = this.userData$.pipe(
    map(({ userData }) => userData as CognitoUserData | null)
  );

  currentUserProfile: CognitoUserData | null = null;

  isAuthenticated = false;

  constructor() {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;

        console.warn('authenticated: ', isAuthenticated);
      }
    );

    this.userProfile$.subscribe((userProfile) => {
      this.currentUserProfile = userProfile;
    });
  }

  checkAuth(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  getAccessToken() {
    return this.oidcSecurityService.getAccessToken();
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoffLocal();

    const logoutUrl = new URL(`${environment.auth.cognitoDomain}/logout`);
    logoutUrl.searchParams.set('client_id', environment.auth.clientId);
    logoutUrl.searchParams.set('logout_uri', environment.auth.postLogoutRedirectUri);

    window.location.href = logoutUrl.toString();
  }
}
