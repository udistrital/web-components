# webcomponent

Cliente de generación de web-component ng-uui-oas

## Especificaciones Técnicas

### Tecnologías Implementadas y Versiones
* [Angular 11.2.1](https://angular.io/)

### Variables de Entorno
```shell
# En Pipeline
SLACK_AND_WEBHOOK: WEBHOOK ..
AWS_ACCESS_KEY_ID: llave de acceso ID Usuario AWS
AWS_SECRET_ACCESS_KEY: Secreto de Usuario AWS
```

### Ejecución del Proyecto

Clonar el proyecto del repositorio de git
```bash
# clone the project
git clone https://github.com/udistrital/web-components.git
# enter the project directory
cd web-components
```
Iniciar el servidor en local
```bash
# install dependency
npx npm install
or
npm install
# start server
npm start 
# Whenever you want to change the port just run
npx ng dev --port = 9528
```

Construcción del web-component
```bash
# task build
npm run build

# genera lo siguiente
dist
 - web-component(folder)
 - web-component.js
```
## Estado CI

| Develop | Relese 0.0.1 | Master |
| -- | -- | -- |
| [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/alternancia_cliente/status.svg?ref=refs/heads/develop)](https://hubci.portaloas.udistrital.edu.co/udistrital/alternancia_cliente) | [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/alternancia_cliente/status.svg?ref=refs/heads/release/0.0.1)](https://hubci.portaloas.udistrital.edu.co/udistrital/alternancia_cliente) | [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/alternancia_cliente/status.svg?ref=refs/heads/master)](https://hubci.portaloas.udistrital.edu.co/udistrital/alternancia_cliente) |

## Licencia

[This file is part of sga_cliente.](LICENSE)

alternancia_cliente is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (atSara Sampaio your option) any later version.

alternancia_cliente is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with alternancia_cliente. If not, see https://www.gnu.org/licenses/.


