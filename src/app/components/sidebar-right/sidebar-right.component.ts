import { Component, EventEmitter, inject, Output } from '@angular/core';
import { faCode, faPalette, faPerson, faPeopleGroup, faNewspaper, faPenNib, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { CognitoService } from 'src/app/services/cognito-service.service';

@Component({
    selector: 'app-sidebar-right',
    templateUrl: './sidebar-right.component.html',
    styleUrls: ['./sidebar-right.component.scss'],
    standalone: false
})
export class SidebarRightComponent {

  public readonly cognitoService = inject(CognitoService);

  @Output() contentSelection = new EventEmitter<string>() ;

  // Icon declarations
  faCode = faCode;
  faPalette = faPalette;
  faPerson = faPerson;
  faPeopleGroup = faPeopleGroup;
  faNewspaper = faNewspaper;
  faPenNib = faPenNib; 
  faLock = faLock;
  faUnlock = faUnlock;

  emitContentSelection(contentType: string){
    this.contentSelection.emit(contentType);
  }

  login(): void {
    this.cognitoService.login();
  }

  logout(): void {
    this.cognitoService.logout();
  }

}
