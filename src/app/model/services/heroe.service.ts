import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';
import { Observable, catchError, of } from 'rxjs';
import { Mac } from '../interfaces/mac.interface';
import { Bitacora } from '../dto/bitacora';


@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  private url:string='http://localhost:8080';
  private misBitacoras: Bitacora[]=[];
  public mac:string='';
  constructor(private http: HttpClient) {
    this.obtenerMac();
  }


  todosLosHeroes():Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.url}/heroes`)
            .pipe(
              catchError(err =>{
                throw 'Error: '+err;
              })
            );
  }

  heroePorId(idHeroe:number):Observable<Heroe>{
    return this.http.get<Heroe>(`${this.url}/heroe/${idHeroe}`)
            .pipe(
              catchError(err =>{
                throw 'Error: '+err;
              })
            );
  }

  
  agregarBitacora(bita:Bitacora):void{
      this.misBitacoras.push(bita);

  }
  get _misBitacoras(){
    return [...this.misBitacoras];
  }

  obtenerMac():void{
    this.http.get<Mac>(`${this.url}/mac`)
      .pipe(
        catchError(err =>{
          throw 'Error: '+err;
        })
      )
      .subscribe(resp =>{
        this.mac=resp.miMac;
        sessionStorage.setItem('mac',this.mac);
        this.obtenerBitacoras(this.mac);
    });
  }

  crearBitacora(bitacora:Bitacora):Observable<Bitacora>{
      return this.http.post<Bitacora>(`${this.url}/bitacoras/crear`,bitacora)
      .pipe(
        catchError(err =>{
          throw 'Error: '+err;
        })
      );
  }

  obtenerBitacoras(user:string):void{
      this.http.get<Bitacora[]>(`${this.url}/bitacoras/${user}`)
      .pipe(
        catchError(err =>{
          throw 'Error: '+err;
        })
      )
      .subscribe(resp=>{
        this.misBitacoras=resp;
      });
  }


 

}
