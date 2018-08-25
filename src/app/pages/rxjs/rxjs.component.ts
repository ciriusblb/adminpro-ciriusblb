import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription
  constructor() { 
    // this.regresaObservable().pipe(
    //   retry(2)
    // )
    // .subscribe(
    //   numero => console.log(numero),
    //   error => console.error(error),
    //   ()=>console.log("termino el obs")
    // );
    this.subscription= this.regresaObservable()
    .subscribe(
      numero => console.log(numero),
      error => console.error(error),
      ()=>console.log("termino el obs")
    );
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{
    return new Observable( (observer: Subscriber<any>) => {        
      let contador = 0;
      let interval = setInterval( () => {

        contador +=1;
        let salida = {
          valor: contador
        }
        observer.next(salida);
        // if ( contador === 3 ){
        //   clearInterval(interval);
        //   observer.complete();
        // }
        // if ( contador === 2 ){
        //   // clearInterval(interval);
        //   observer.error('axulio');
        // }
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter( (valor, index)=>{
        if(valor%2 == 1){
          return true;
        }else{
          return false;
        }
      })
    );
  }

}
