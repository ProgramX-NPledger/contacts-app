import { Component } from '@angular/core';
import { profileIconNames } from './profile-icon-names';

@Component({
  selector: 'con-profile-icon-selector',
  templateUrl: './profile-icon-selector.component.html',
  styleUrls: ['./profile-icon-selector.component.css']
})
export class ProfileIconSelectorComponent {
  profileIcons = profileIconNames;
  showAllIcons: boolean = true;
  selectedIcon: string | null = null;

  iconSelected(icon: string) {
    this.selectedIcon = icon;
    this.showAllIcons = false;
    // Emit the selected icon if needed, e.g., using an EventEmitter
    console.log(`Selected icon: ${icon}`);
  }

}
