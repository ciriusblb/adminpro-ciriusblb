import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/filter';

import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  
  titulo: string;
  constructor(private router: Router, private title: Title, private meta: Meta) { 
    this.getDataRoutes().subscribe(data=>{
      console.log(data);
      this.titulo=data.titulo;
      this.title.setTitle(this.titulo);
      const metaTag: MetaDefinition={
        name:'description',
        content: this.titulo
      }
      this.meta.updateTag(metaTag);
    })
  }

  ngOnInit() {
  }
  getDataRoutes(){
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd )=> event.snapshot.firstChild===null),
      map( ( event: ActivationEnd )=> event.snapshot.data)
    )
  }

}
