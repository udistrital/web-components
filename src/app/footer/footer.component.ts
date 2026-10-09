import { Component } from '@angular/core';

@Component({
  selector: 'ng-uui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  universidad: any;
  normatividad: any;
  recomendados: any;
  contactenos: any;
  final: any;
  copyright: any;
  social: any;
  basePathAssets = 'https://pruebasassets.portaloas.udistrital.edu.co/';

  constructor() {
    this.social = {
      list: [{
        title: 'Horario',
        class: 'access_time',
        link: '#',
        value: ['Lunes a viernes', '8 a. m. a 5 p. m.']
      }, {
        title: 'Nombre',
        class: 'language',
        link: '#',
        value: ['Sistema Integrado de informática y  Telecomunicaciones '],
      }, {
        title: 'Phone',
        class: 'call',
        link: 'tel:0313239300',
        value: ['323 93 00', 'Ext(s). Secretaría: 1109, Soporte 1111 - 1112'],
      }, {
        title: 'Direccion',
        class: 'place',
        link: 'https://maps.app.goo.gl/En33N66auhdhFcJy5',
        value: ['Calle 13 31 75']
      }, {
        title: 'mail',
        class: 'alternate_email',
        link: 'mailto:computo@udistrital.edu.co',
        value: ['computo@udistrital.edu.co']
      }
      ],
    };
    this.copyright = '© Copyright 2019. | Todos los Derechos Reservados';
  }

}
