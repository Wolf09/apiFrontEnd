import { Component } from '@angular/core';
import { Bitacora } from 'src/app/model/dto/bitacora';
import { Heroe } from 'src/app/model/interfaces/heroe.interface';
import { HeroeService } from 'src/app/model/services/heroe.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

      constructor(private heroeService:HeroeService){
          
      }
    
      ngOnInit(): void {
       
          this.bitas;
       
        
      }
    
      get bitas(){
        return this.heroeService._misBitacoras;
      }

  


}
