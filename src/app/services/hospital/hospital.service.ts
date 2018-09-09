import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  hospital:Hospital;
  token:string;
  constructor(
    public http:HttpClient,
    public _usuariosService:UsuarioService
  ) { 
    this.token=_usuariosService.token;
  }
  cargarHospitales(desde:number){
    let url = URL_SERVICIOS+'/hospital?desde='+desde;
    return this.http.get(url);
  }
  obtenerHospital(id:string){
    let url = URL_SERVICIOS+'/hospital/'+id;
    return this.http.get(url)
            .pipe(map((resp:any)=>{
              return resp.hospital;
            })
          )

  }
  crearHospital(nombre:string){
    let url = URL_SERVICIOS+'/hospital?token='+this.token;
    return this.http.post(url,{nombre})
      .pipe(
        map((resp:any)=>{
          swal('Hospital creado', resp.hospital.nombre, 'success')
          return resp.hospital;
        })
      )
    }
  buscarHospital(termino:string){
    let url=URL_SERVICIOS+'/busqueda/coleccion/hospitales/'+termino;
    return this.http.get(url)
            .pipe(map((resp:any)=>resp.hospitales));
  }
  borrarHospital(id:string){
    let url=URL_SERVICIOS+'/hospital/'+id+'?token='+this.token;
    return this.http.delete(url)
            .pipe(map(resp=>{
              swal('Hospital borrado', 'El hospital ha sido borrado correctamente','success');
              return true;
            }))
  }
  actualizarHospital(hospital:Hospital){
    let url = URL_SERVICIOS+'/hospital/'+hospital._id;
    url+='?token='+this.token;
    return this.http.put(url,hospital)
      .pipe(
        map((resp:any)=>{
          swal('hospital Actualizado',hospital.nombre,'success');
          return true;
        })
      );
  }
}
