import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './pages/components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HomeComponent,
    SidebarComponent
  ]
})
export class ViewModule { }
