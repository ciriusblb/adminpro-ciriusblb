import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales:Hospital[]=[];
  medico:Medico=new Medico('',null,'','','');
  hospital:Hospital=new Hospital('');
  desde:number=-1;
  constructor(
    public _medicoService:MedicoService,
    public _hospitalService:HospitalService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public _modalUploadService:ModalUploadService
  ) {
    activatedRoute.params.subscribe(params=>{
      let id=params['id'];
      if(id!=='nuevo'){
        this.cargarMedico(id);
      }
    })
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales(this.desde)
      .subscribe((resp:any) => {
        this.hospitales=resp.hospitales
      });
      this._modalUploadService.notificacion
        .subscribe(resp=>{
          console.log("resp ",resp);
          if(resp.medico){
             this.medico.img=resp.medico.img;
          }
        })
  }
  guardarMedico(f:NgForm){
    if(f.invalid){
      return;
    }
    this._medicoService.guardarMedico(this.medico)
      .subscribe(medico=>{
        this.medico._id=medico._id;
        this.router.navigate(['/medico',medico._id]);
      })
  }
  cambioHospital(id:string){
    if(!id){
      console.log("no hya id")
      return;
    }
    this._hospitalService.obtenerHospital(id)
    .subscribe((hospital:any)=>{
      this.hospital=hospital;
      console.log('this.hospital ',this.hospital);
    });
  }
  cargarMedico(id:string){
    this._medicoService.cargarMedico(id)
      .subscribe((medico) => {
        console.log("medico ",medico);
        this.medico=medico
        this.medico.hospital=medico.hospital._id;
        console.log(this.medico)
        this.cambioHospital(this.medico.hospital);
      })
  }
  cambiarFoto(){
    console.log('this.medico._id ',this.medico._id);
    this._modalUploadService.mostrarModal('medicos',this.medico._id);
  }
}
