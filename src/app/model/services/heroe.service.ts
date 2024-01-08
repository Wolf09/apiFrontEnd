import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private token='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcGliYWNrZW5kIiwiZXhwIjoxNzA0NzAwMDc3LCJpYXQiOjE3MDQ2OTI4Nzd9.J4B5tiwjETRa3P6cgF-cJG4WqPFC0fT7NjvelKKKIMM';
  constructor(private http: HttpClient) {
    this.obtenerMac();
  }


  todosLosHeroes():Observable<Heroe[]>{
    
    return this.http.get<Heroe[]>(`${this.url}/heroes`,{
            headers:{'Content-Type':'application/json; charset=utf-8',
            'Authorization':`Bearer ${this.token}` 
            }
          })
            .pipe(
              catchError(err =>{
                throw 'Error: '+err;
              })
            );
  }

  heroePorId(idHeroe:number):Observable<Heroe>{
    return this.http.get<Heroe>(`${this.url}/heroe/${idHeroe}`,{
              headers:{'Content-Type':'application/json; charset=utf-8',
              'Authorization':`Bearer ${this.token}` 
              }
            })
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
    this.http.get<Mac>(`${this.url}/mac`,{
        headers:{'Content-Type':'application/json; charset=utf-8',
        'Authorization':`Bearer ${this.token}` 
        }
      })
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
      return this.http.post<Bitacora>(`${this.url}/bitacoras/crear`,bitacora,{
        headers:{'Content-Type':'application/json; charset=utf-8',
        'Authorization':`Bearer ${this.token}` 
        }
      })
      .pipe(
        catchError(err =>{
          throw 'Error: '+err;
        })
      );
  }

  obtenerBitacoras(user:string):void{
      this.http.get<Bitacora[]>(`${this.url}/bitacoras/${user}`,{
        headers:{'Content-Type':'application/json; charset=utf-8',
        'Authorization':`Bearer ${this.token}` 
        }
      })
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
