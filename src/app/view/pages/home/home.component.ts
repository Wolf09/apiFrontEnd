import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Bitacora } from 'src/app/model/dto/bitacora';
import { Heroe } from 'src/app/model/interfaces/heroe.interface';
import { HeroeService } from 'src/app/model/services/heroe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  @ViewChild('mostrarHero')
  public divHero: ElementRef<HTMLDivElement>;
  public bandera:boolean=false;
  public misHeroes:Heroe[]=[];
  public miHero:Heroe;
  miBitacora:Bitacora= new Bitacora();
  private bitacoraCreada:Bitacora;


  constructor(private heroeService:HeroeService){
    
  }

  ngOnInit(): void {
    
    this.obtenerHeroes();
    
  }


  private obtenerHeroes(){
    
    this.heroeService.todosLosHeroes()
    .subscribe(resp =>{
      resp.map(resp=>{
                   resp.thumbnail.path=resp.thumbnail.path+'.'+resp.thumbnail.extension;
          });
          this.misHeroes=resp;
          this.miBitacora.metodo="todosLosHeroes()";
          if(sessionStorage.getItem('mac')){
            this.miBitacora.usuario=this.heroeService.mac;
          }  
          this.crearBitacora(this.miBitacora);
          
    });
    
    

  }

  private crearBitacora(bitacora:Bitacora){
      this.heroeService.crearBitacora(bitacora)
      .subscribe(resp=>{
          this.bitacoraCreada=resp;
          this.heroeService.agregarBitacora(this.bitacoraCreada);
      });
  }

  public miBandera(miId:number):void{
    this.heroeService.heroePorId(miId)
    .subscribe(resp =>{
          this.miHero=resp;
          this.miHero.thumbnail.path=this.miHero.thumbnail.path+"."+this.miHero.thumbnail.extension;  
          this.miBitacora.metodo="heroePorId()";
          if(sessionStorage.getItem('mac')){
            this.miBitacora.usuario=this.heroeService.mac;
          }  
    
          this.crearBitacora(this.miBitacora); 
          this.bandera=true;
    });
    
  }



}
