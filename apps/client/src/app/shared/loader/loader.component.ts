import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'shared-loader',
  imports: [NgOptimizedImage],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {}
