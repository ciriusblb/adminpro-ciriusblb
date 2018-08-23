import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-imcrementador',
  templateUrl: './imcrementador.component.html',
  styles: []
})
export class ImcrementadorComponent implements OnInit {
  
  @ViewChild('txtProgress') txtProgress: ElementRef; //decaorador que hace referencia a un elemento html

  @Input() progreso: number = 50;
  @Input('nombre') leyenda: string = 'leyenda';

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {  }
  ngOnInit() {  }

  onChanges(newValue: number){

    if(newValue>=100){
      this.progreso=100;
    }else if(newValue<=0){
      this.progreso=0;
    }else{
      this.progreso=newValue;
    }
    this.txtProgress.nativeElement.value=this.progreso;
    this.cambioValor.emit( this.progreso );
  }
  cambiarValor(valor){
    if(this.progreso>=100 && valor > 0){
      this.progreso=100;
      return;
    }
    if(this.progreso<=0 && valor < 0){
      this.progreso=0;
      return;
    }

    this.progreso= this.progreso+valor;
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();

  }
}
