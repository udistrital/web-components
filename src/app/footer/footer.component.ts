import { Component } from '@angular/core';

@Component({
  selector: 'ng-uui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  universidad: any;
  normatividad: any;
  recomendados: any;
  contactenos: any;
  final: any;
  copyright: any;
  social: any;

  constructor() {
    this.social = {
      list: [{
        title: 'Horario',
        class: 'time',
        value: ['Lunes a viernes', '8am a 5pm']
      }, {
        title: 'Nombre',
        class: 'globe',
        value: ['Sistema Integrado de informática y  Telecomunicaciones '],
      }, {
        title: 'Phone',
        class: 'call',
        value: ['323 93 00', 'Ext. 1112'],
      }, {
        title: 'Direccion',
        class: 'pin',
        value: ['Cra 8 # 40-78', 'Piso 1']
      }, {
        title: 'mail',
        class: 'at',
        value: ['computo@udistrital.edu.co']
      }
      ],
    };
    this.copyright = '© Copyright 2019. | Todos los Derechos Reservados';
  }

}
