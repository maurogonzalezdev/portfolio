import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RibbonLayoutComponent } from '../ribbon-layout/ribbon-layout.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RibbonLayoutComponent],
  templateUrl: './main-layout.component.html',
  styles: `.margin-main{margin-left:304px;}`
})
export class MainLayoutComponent {

}
