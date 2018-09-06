import { Component, OnInit } from '@angular/core';
declare function init_plugins(); // para quitar la pantalla de inicio 

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})

export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();

  }

}
