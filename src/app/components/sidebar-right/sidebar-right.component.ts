import { Component, EventEmitter, Output } from '@angular/core';
import { faCode, faPalette, faPerson, faPeopleGroup, faNewspaper } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent {

  @Output() contentSelection = new EventEmitter<string>() ;

  // Icon declarations
  faCode = faCode;
  faPalette = faPalette;
  faPerson = faPerson;
  faPeopleGroup = faPeopleGroup;
  faNewspaper = faNewspaper; 

  emitContentSelection(contentType: string){
    this.contentSelection.emit(contentType);
  }

}
