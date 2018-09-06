import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

import swal from 'sweetalert'; 
import { Router } from '@angular/router';


declare function init_plugins(); // para quitar la pantalla de inicio 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  forma:FormGroup;
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales(campo1:string, campo2: string){
    // en una funcion de validacion el return es el error
    return (group:FormGroup)=>{
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if(pass1 === pass2){
        return null;
      }
      return{
        sonIguales:true
      }
    }
  }
  ngOnInit() {
    init_plugins();
    this.forma= new FormGroup({
      nombre: new FormControl( null, Validators.required),
      correo: new FormControl( null, Validators.required),
      password: new FormControl( null, Validators.required),
      password2: new FormControl( null, Validators.required),
      condiciones: new FormControl( false )
    },{validators: this.sonIguales('password','password2')});

    this.forma.setValue({
      nombre:'Ciro',
      correo:'ciriusblb@gmail.com',
      password:'El5-mejo',
      password2:'El5-mejo',
      condiciones:true
    })

  }
  registrarUsuario(){
    if(this.forma.invalid){
      return;
    }
    if(!this.forma.value.condiciones){
      swal('Importante','Debes aceptar las condiciones','warning');
      return;
    }
    // ingresa estos datos al model de usuario
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );
    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => this.router.navigate(['/login']));
  }

}
