import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from './../../src/environments/environment';
import { NavItem } from './interfaces/nav-item';
import { MenuService } from './services/menu.service';
@Component({
  selector: 'ng-uui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('sidebar') sidebar: ElementRef;
  constructor(    private menuService: MenuService  ){}
  title = 'app-client';
  navItems: NavItem[] = [
    {
      Nombre: 'DevFestFL',
      Icono: 'recent_actors',
      Opciones: [
        {
          Nombre: 'Speakers',
          Icono: 'group',
          Opciones: [
            {
              Nombre: 'Michael Prentice',
              Icono: 'person',
              Url: 'michael-prentice',
              Opciones: [
                {
                  Nombre: 'Create Enterprise UIs',
                  Icono: 'star_rate',
                  Url: 'material-design'
                }
              ]
            },
            {
              Nombre: 'Stephen Fluin',
              Icono: 'person',
              Url: 'stephen-fluin',
              Opciones: [
                {
                  Nombre: 'What\'s up with the Web?',
                  Icono: 'star_rate',
                  Url: 'what-up-web'
                }
              ]
            },
            {
              Nombre: 'Mike Brocchi',
              Icono: 'person',
              Url: 'mike-brocchi',
              Opciones: [
                {
                  Nombre: 'My ally, the CLI',
                  Icono: 'star_rate',
                  Url: 'my-ally-cli'
                },
                {
                  Nombre: 'Become an Angular Tailor',
                  Icono: 'star_rate',
                  Url: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          Nombre: 'Sessions',
          Icono: 'speaker_notes',
          Opciones: [
            {
              Nombre: 'Create Enterprise UIs',
              Icono: 'star_rate',
              Url: 'material-design'
            },
            {
              Nombre: 'What\'s up with the Web?',
              Icono: 'star_rate',
              Url: 'what-up-web'
            },
            {
              Nombre: 'My ally, the CLI',
              Icono: 'star_rate',
              Url: 'my-ally-cli'
            },
            {
              Nombre: 'Become an Angular Tailor',
              Icono: 'star_rate',
              Url: 'become-angular-tailer'
            }
          ]
        },
        {
          Nombre: 'Feedback',
          Icono: 'feedback',
          Url: 'feedback'
        }
      ]
    },
    {
      Nombre: 'Disney',
      Icono: 'videocam',
      Opciones: [
        {
          Nombre: 'Speakers',
          Icono: 'group',
          Opciones: [
            {
              Nombre: 'Michael Prentice',
              Icono: 'person',
              Url: 'michael-prentice',
              Opciones: [
                {
                  Nombre: 'Create Enterprise UIs',
                  Icono: 'star_rate',
                  Url: 'material-design'
                }
              ]
            },
            {
              Nombre: 'Stephen Fluin',
              Icono: 'person',
              Url: 'stephen-fluin',
              Opciones: [
                {
                  Nombre: 'What\'s up with the Web?',
                  Icono: 'star_rate',
                  Url: 'what-up-web'
                }
              ]
            },
            {
              Nombre: 'Mike Brocchi',
              Icono: 'person',
              Url: 'mike-brocchi',
              Opciones: [
                {
                  Nombre: 'My ally, the CLI',
                  Icono: 'star_rate',
                  Url: 'my-ally-cli'
                },
                {
                  Nombre: 'Become an Angular Tailor',
                  Icono: 'star_rate',
                  Url: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          Nombre: 'Sessions',
          Icono: 'speaker_notes',
          Opciones: [
            {
              Nombre: 'Create Enterprise UIs',
              Icono: 'star_rate',
              Url: 'material-design'
            },
            {
              Nombre: 'What\'s up with the Web?',
              Icono: 'star_rate',
              Url: 'what-up-web'
            },
            {
              Nombre: 'My ally, the CLI',
              Icono: 'star_rate',
              Url: 'my-ally-cli'
            },
            {
              Nombre: 'Become an Angular Tailor',
              Icono: 'star_rate',
              Url: 'become-angular-tailer'
            }
          ]
        },
        {
          Nombre: 'Feedback',
          Icono: 'feedback',
          Url: 'feedback'
        }
      ]
    },
    {
      Nombre: 'Orlando',
      Icono: 'movie_filter',
      Opciones: [
        {
          Nombre: 'Speakers',
          Icono: 'group',
          Opciones: [
            {
              Nombre: 'Michael Prentice',
              Icono: 'person',
              Url: 'michael-prentice',
              Opciones: [
                {
                  Nombre: 'Create Enterprise UIs',
                  Icono: 'star_rate',
                  Url: 'material-design'
                }
              ]
            },
            {
              Nombre: 'Stephen Fluin',
              Icono: 'person',
              Url: 'stephen-fluin',
              Opciones: [
                {
                  Nombre: 'What\'s up with the Web?',
                  Icono: 'star_rate',
                  Url: 'what-up-web'
                }
              ]
            },
            {
              Nombre: 'Mike Brocchi',
              Icono: 'person',
              Url: 'mike-brocchi',
              Opciones: [
                {
                  Nombre: 'My ally, the CLI',
                  Icono: 'star_rate',
                  Url: 'my-ally-cli'
                },
                {
                  Nombre: 'Become an Angular Tailor',
                  Icono: 'star_rate',
                  Url: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          Nombre: 'Sessions',
          Icono: 'speaker_notes',
          Opciones: [
            {
              Nombre: 'Create Enterprise UIs',
              Icono: 'star_rate',
              Url: 'material-design'
            },
            {
              Nombre: 'What\'s up with the Web?',
              Icono: 'star_rate',
              Url: 'what-up-web'
            },
            {
              Nombre: 'My ally, the CLI',
              Icono: 'star_rate',
              Url: 'my-ally-cli'
            },
            {
              Nombre: 'Become an Angular Tailor',
              Icono: 'star_rate',
              Url: 'become-angular-tailer'
            }
          ]
        },
        {
          Nombre: 'Feedback',
          Icono: 'feedback',
          Url: 'feedback'
        }
      ]
    },
    {
      Nombre: 'Maleficent',
      disabled: true,
      Icono: 'report_problem',
      Opciones: [
        {
          Nombre: 'Speakers',
          Icono: 'group',
          Opciones: [
            {
              Nombre: 'Michael Prentice',
              Icono: 'person',
              Url: 'michael-prentice',
              Opciones: [
                {
                  Nombre: 'Create Enterprise UIs',
                  Icono: 'star_rate',
                  Url: 'material-design'
                }
              ]
            },
            {
              Nombre: 'Stephen Fluin',
              Icono: 'person',
              Url: 'stephen-fluin',
              Opciones: [
                {
                  Nombre: 'What\'s up with the Web?',
                  Icono: 'star_rate',
                  Url: 'what-up-web'
                }
              ]
            },
            {
              Nombre: 'Mike Brocchi',
              Icono: 'person',
              Url: 'mike-brocchi',
              Opciones: [
                {
                  Nombre: 'My ally, the CLI',
                  Icono: 'star_rate',
                  Url: 'my-ally-cli'
                },
                {
                  Nombre: 'Become an Angular Tailor',
                  Icono: 'star_rate',
                  Url: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          Nombre: 'Sessions',
          Icono: 'speaker_notes',
          Opciones: [
            {
              Nombre: 'Create Enterprise UIs',
              Icono: 'star_rate',
              Url: 'material-design'
            },
            {
              Nombre: 'What\'s up with the Web?',
              Icono: 'star_rate',
              Url: 'what-up-web'
            },
            {
              Nombre: 'My ally, the CLI',
              Icono: 'star_rate',
              Url: 'my-ally-cli'
            },
            {
              Nombre: 'Become an Angular Tailor',
              Icono: 'star_rate',
              Url: 'become-angular-tailer'
            }
          ]
        },
        {
          Nombre: 'Feedback',
          Icono: 'feedback',
          Url: 'feedback'
        }
      ]
    }
  ];
  environment = environment;
  resultado(event) {
    console.log(event.detail);
  }
    ngAfterViewInit() {
    this.menuService.sidebar = this.sidebar;
  }

  autoclose(event){
    console.log(event);
    this.menuService.closeNav();
  }
}
