import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos:number=0;
  constructor(
    public http: HttpClient,
    public _usuarioService:UsuarioService
  ) { }
  cargarMedicos(desde:number){
    let url = URL_SERVICIOS+'/medico?desde='+desde;
    return this.http.get(url);
  }
  buscarMedico(termino:string){
    let url=URL_SERVICIOS+'/busqueda/coleccion/medicos/'+termino;
    return this.http.get(url)
            .pipe(map((resp:any)=>resp.medicos));
  }
  borrarUsuario(id:string){
    let url=URL_SERVICIOS+'/medico/'+id+'?token='+this._usuarioService.token;
    return this.http.delete(url)
            .pipe(map(resp=>{
              swal('Médico borrado', 'El médico ha sido borrado correctamente','success');
              return true;
            }))
  }
  guardarMedico(medico:Medico){
    let url = URL_SERVICIOS+'/medico';
    if(medico._id){
      url+='/'+medico._id;
      url+='?token='+this._usuarioService.token;

      return this.http.put(url,medico)
              .pipe(map((resp:any)=>{
                swal('Médico actuazalido',medico.nombre,'success');
                return resp.medico;
              }))
    }else{
      url+='?token='+this._usuarioService.token;
      return this.http.post(url,medico)
        .pipe(
          map( (resp:any) =>{
            swal('Médico creado',medico.nombre,'success');
            return resp.medico;
          })
        );
    }
    

  }
  cargarMedico(id:string){
    let url = URL_SERVICIOS+'/medico/'+id;
    return this.http.get(url)
            .pipe(map((resp:any)=>{
              return resp.medico;
            }))
  }
}
