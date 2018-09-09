import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal:any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  cargando:boolean=true;
  totalHospitales:number=0;
  hospitales:Hospital[]=[];
  desde:number=0;

  constructor(
    public _hospitalesService:HospitalService,
    public _modalUploadService:ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(
      resp=> this.cargarHospitales()
    )
  }
  cargarHospitales(){
    this.cargando=true;
    this._hospitalesService.cargarHospitales(this.desde)
      .subscribe((resp:any)=>{
        console.log(resp);
        this.totalHospitales=resp.total;
        this.hospitales=resp.hospitales;
        this.cargando=false;
      })
  }
  buscarHospital(termino:string){
    if(termino.length<=0){
      this.cargarHospitales();
      return;
    }
    this.cargando=true;
    this._hospitalesService.buscarHospital(termino)
      .subscribe( (hospitales:Hospital[])=>{
        console.log(hospitales);
        this.hospitales=hospitales;
        this.cargando=false;
      })
  }
  mostrarModal(id:string){
    this._modalUploadService.mostrarModal('hospitales',id);    
  }
  guardarhospital(hospital:Hospital){
    this._hospitalesService.actualizarHospital(hospital)
    .subscribe(resp=>{
      console.log(resp);
    });
  }
  borrarhospital(hospital:Hospital){
    swal({
      title:'¿Esta seguro?',
      text:'Esta a punto de borrar a '+hospital.nombre,
      icon:'warning',
      buttons:true,
      dangerMode:true,
    })
    .then(borrar=>{
      if(borrar){
        this._hospitalesService.borrarHospital(hospital._id)
          .subscribe(borrado=>{
            console.log(borrado);
            this.cargarHospitales();
          })
      }
    })
  }
  crearHospital(){
    swal({
      title:'Crear hospital',
      text:'Ingrese el nombre del hospital',
      content:'input',
      icon:'info',
      buttons:true,
      dangerMode:true
    }).then(valor=>{
      if(!valor || valor.length===0){
        return;
      }
      this._hospitalesService.crearHospital(valor)
        .subscribe(()=> this.cargarHospitales());
    })
  }
  cambiarDesde(valor:number){
    let desde = this.desde+valor;
    console.log(desde);
    if(desde>=this.totalHospitales || desde<0){
      return;
    }
    this.desde+=valor;
    this.cargarHospitales();
  }
}
