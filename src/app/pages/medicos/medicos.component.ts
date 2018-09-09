import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos:Medico[]=[];
  desde:number=0;
  totalMedicos:number=0;
  constructor(
    public _medicosService:MedicoService 
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }
  cargarMedicos(){
    console.log(this.desde);
    this._medicosService.cargarMedicos(this.desde)
      .subscribe((resp:any)=> {
        this.totalMedicos=resp.total;
        this.medicos=resp.medicos;
      });
  }
  buscarMedico(termino:string){
    if(termino.length<=0){
      this.cargarMedicos();
      return;
    }
    this._medicosService.buscarMedico(termino)
      .subscribe(medicos => this.medicos=medicos);
  }
  borrarMedico(medico:Medico){
    this._medicosService.borrarUsuario(medico._id)
      .subscribe( () => this.cargarMedicos());
  }
  cambiarDesde(valor:number){
    let desde = this.desde+valor;
    if(desde>=this.totalMedicos || desde<0){
      return;
    }
    this.desde+=valor;
    this.cargarMedicos();
  }
}
