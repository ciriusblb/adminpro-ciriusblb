import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
declare function init_plugins(); // para quitar la pantalla de inicio 
declare const gapi: any; // libreria de google
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean=false;
  email:string;
  auth2:any; // informacion que manda google
  constructor(public router: Router, public _usuarioService:UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if(this.email.length>1){
      this.recuerdame=true;
    }
  }
  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id:'1009310664851-lpujothp5p43so37bkns8935q37ds143.apps.googleusercontent.com',
        cookiepolicy:'single_host_origin',
        scope:'profile email'
      })
      this.attachSignin(document.getElementById('btnGoogle'));
    })
  }
  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, (googleUser)=>{
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      // console.log(token);
      this._usuarioService.loginGoogle(token)
        .subscribe(resp=>{
          console.log(resp);
          window.location.href = '#/dashboard';
        })
    })
  }
  ingresar( forma : NgForm){
    if(forma.invalid){
      return;
    }
    let usuario= new Usuario(null, forma.value.email, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(resp=> {
        console.log(resp);
        this.router.navigate(['/dashboard']);
      });
  }

}
