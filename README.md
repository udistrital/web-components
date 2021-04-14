# WebComponent base para construcción de aplicaciones Oficina Asesora de Sistemas Universidad Distrital

  Construye header, menu sidebar, footer, autenticación vía wso2
  
## Especificaciones Técnicas

## Tecnologías Implementadas y Versiones
* [Angular 11.2.1](https://angular.io/)

## Ejecución del Proyecto

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

## AL instalarla debe quedar
  Login
  ![image](https://user-images.githubusercontent.com/8224759/114635914-73ac7000-9c8b-11eb-991d-62c424d9038a.png)
  header footer
  ![image](https://user-images.githubusercontent.com/8224759/114635508-7fe3fd80-9c8a-11eb-9210-6914f1f39bcc.png)
  sidebar
  ![image](https://user-images.githubusercontent.com/8224759/114635580-9ee28f80-9c8a-11eb-9eb1-38f90681b2da.png)

  
## Estado CI

| Develop | Relese 0.0.1 | Master |
| -- | -- | -- |
| [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/alternancia_cliente/status.svg?ref=refs/heads/develop)](https://hubci.portaloas.udistrital.edu.co/udistrital/alternancia_cliente) | [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/alternancia_cliente/status.svg?ref=refs/heads/release/0.0.1)](https://hubci.portaloas.udistrital.edu.co/udistrital/alternancia_cliente) | [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/alternancia_cliente/status.svg?ref=refs/heads/master)](https://hubci.portaloas.udistrital.edu.co/udistrital/alternancia_cliente) |

## Licencia

[This file is part of sga_cliente.](LICENSE)

alternancia_cliente is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (atSara Sampaio your option) any later version.

alternancia_cliente is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with alternancia_cliente. If not, see https://www.gnu.org/licenses/.


