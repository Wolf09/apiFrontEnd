import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  public heroeList: Heroe[]=[];
  private url2:string= 'https://gateway.marvel.com:443/v1/public/characters?apikey=f2d24302a91eb25d672fd1967f9e52d4&ts=Wed Nov 29 2023 16:09:36 GMT-0400 (hora de Bolivia)&hash=5c1d3d1e5c7bab1759046dee46cd850b';
  private url:string='http://localhost:8080';
  private num:number=1011334;
  constructor(private http: HttpClient) {
    this.todosLosHeroes();
   }

  todosLosHeroes():void{
    this.http.get<Heroe[]>(`${this.url}/heroes`)
    .subscribe(resp =>{
        resp.map(resp=>{
            resp.thumbnail.path=resp.thumbnail.path+'.'+resp.thumbnail.extension;
        })
        this.heroeList=resp;
    });

  }
  

}
