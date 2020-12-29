import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'ng-uui-oas',
  templateUrl: './oas.component.html',
  styleUrls: ['./oas.component.scss']
})
export class OasComponent {
  opened: boolean = false;
  constructor(private menuService: MenuService) {
    this.menuService.sidebar$.subscribe((opened) => (this.opened = opened))
  }
  title = 'app-client';
  navItems = [
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

  ngAfterViewInit() {
  }

}