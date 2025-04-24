import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'shared-desktop-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './desktop-navbar.component.html',
  styleUrl: './desktop-navbar.component.css',
})
export class DesktopNavbarComponent {}
