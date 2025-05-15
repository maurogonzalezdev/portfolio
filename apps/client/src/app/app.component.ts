import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
