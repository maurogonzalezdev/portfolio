import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'blog-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
