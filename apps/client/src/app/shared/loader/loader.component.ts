import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'shared-loader',
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {}
