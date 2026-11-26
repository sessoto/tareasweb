# tareasweb

Web estática (HTML + JavaScript, servida con nginx) que muestra las tareas de [tareasapi](https://github.com/sessoto/tareasapi). Es parte del taller de Prácticas DevOps e Integración Continua (USM).

- Puerto del contenedor: **80**.
- La API se busca en el mismo host, en el **puerto de la web + 1** (dev: web 8090 → API 8091; prod: web 8190 → API 8191).
- Pruebas con cobertura: `npm test` (genera `lcov.info` para SonarQube).

Ramas: `main`, `dev`, `feature/**` (ambiente de desarrollo en Jenkins) y `release/**` (ambiente de producción en Jenkins).
