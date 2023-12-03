import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  aux:string= 'https://gateway.marvel.com:443/v1/public/characters?apikey=f2d24302a91eb25d672fd1967f9e52d4&ts=Wed Nov 29 2023 16:09:36 GMT-0400 (hora de Bolivia)&hash=5c1d3d1e5c7bab1759046dee46cd850b';

}
