import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RibbonLayoutComponent } from '../ribbon-layout/ribbon-layout.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RibbonLayoutComponent, NgScrollbarModule],
  templateUrl: './main-layout.component.html',
  styles: `.margin-main{margin-left:304px;}`
})
export class MainLayoutComponent {

}
