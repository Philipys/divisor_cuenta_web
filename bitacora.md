# Bitácora de Práctica: Migración Tecnológica con SDD (Flutter a React)

**Materia:** Programación Asistida de Aplicaciones · USFQ  
**Estudiante:** Felipe  
**Profesor:** Jose David Vega Sánchez  
**Agente utilizado:** Antigravity IDE (Integración `agy` / Gemini 3.8 Flash)  
**Proyecto origen:** `divisor_cuenta` (Flutter - rama `sdd`)  
**Proyecto destino:** `divisor_cuenta_web` (React + Vite + Vitest)  

---

## Tabla de Métricas Comparativas

| Métrica | Flutter (laboratorio previo) | React (este deber) |
|---|:---:|:---:|
| **Minutos hasta la primera versión que compila** | ~8 min | **~4 min** |
| **Minutos hasta que pasan los 6 casos de aceptación** | ~12 min | **~6 min** |
| **Iteraciones con el agente (mensajes de corrección)** | 0 | **0** |
| **Líneas de código escritas a mano** | ~35 líneas (`casos_de_prueba.dart`) | **38 líneas** (`test/casosDePrueba.js`) |
| **Enunciados modificados en la spec** | — | **0 (0%) — Viajó 100% intacta** |
| **Enunciados modificados en la Constitution** | — | **3 adaptados en redacción (0 reemplazados)** |
| **Líneas modificadas en el plan** | — | **100% reescrito (el CÓMO cambió completamente)** |
| **Casos de aceptación que pasan (0–6)** | 6 de 6 | **6 de 6** |
| **Total de pruebas automatizadas que pasan** | 10 (7 unitarias + 3 widget) | **10 (7 Vitest de dominio/LSP + 3 de UI)** |

*Nota sobre la medición:* El tiempo se midió con cronómetro a partir del inicio de la planificación y configuración del nuevo proyecto en React. Se alcanzaron los 6 casos de prueba en verde de forma limpia en el primer intento de ejecución sin requerir prompts de corrección (0 iteraciones adicionales).

---

## Registro Cronológico del Proceso

### 1. Verificación Inicial de Flutter
- Se comprobó la rama `sdd` del laboratorio previo en `participacion 7/divisor_cuenta` ejecutando `flutter test`.
- **Resultado:** `All tests passed!` (10 pruebas exitosas: 6 casos de la spec, 1 de sustitución de Liskov y 3 de widgets).

### 2. Preparación del Entorno
- Se verificó la instalación de Node.js v24.20.0 (LTS) y npm 11.19.0.
- Se inicializó el proyecto web en React con Vite:
  ```bash
  npx --yes create-vite@latest divisor_cuenta_web --template react
  cd divisor_cuenta_web
  npm install
  ```
- Repositorio Git independiente inicializado con su commit base: `proyecto react base, sin tocar`.

### 3. Integración de Spec Kit y Reutilización de la Spec
- Inicialización de Spec Kit:
  ```bash
  specify init --here --force --non-interactive --ignore-agent-tools --integration agy
  ```
- Copia directa de la especificación funcional desde el proyecto Flutter:
  ```powershell
  $targetDir = "specs\001-divisor-cuenta"
  New-Item -ItemType Directory -Force -Path $targetDir
  Copy-Item "..\..\participacion 7\divisor_cuenta\specs\001-divisor-cuenta\spec.md" "$targetDir\spec.md"
  ```
- **Verificación de Diff:**
  ```powershell
  git diff --no-index -- "..\..\participacion 7\divisor_cuenta\specs\001-divisor-cuenta\spec.md" "specs\001-divisor-cuenta\spec.md"
  ```
  Salida **totalmente vacía** (código de salida 0). La especificación viajó 100% intacta.
- Commit realizado: `spec kit + la misma spec del proyecto flutter`.

### 4. Adaptación de la Constitución
- Se trasladaron los principios de calidad (SOLID), arquitectura limpia en 3 capas (`src/presentation -> src/domain <- src/data`), seguridad y pruebas a `.specify/memory/constitution.md`.
- Solo se adaptó la redacción tecnológica (`lib/` a `src/`, `package:flutter` a `react`, y `main.dart` a `main.jsx`).

### 5. Planificación y Tareas (El CÓMO)
- Se redactó `specs/001-divisor-cuenta/plan.md` definiendo el stack (React, Vite, JavaScript modular, estado local con `useState`, Vitest y jsdom).
- Se desglosó el trabajo en tareas atómicas `T001` a `T010` en `specs/001-divisor-cuenta/tasks.md`.
- Commit realizado: `plan y tareas para react (la spec no se toco)`.

### 6. Implementación y Pruebas
- Se instaló el entorno de pruebas:
  ```bash
  npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
  ```
- Se implementaron los módulos respetando estrictamente SOLID:
  - `src/domain/cuenta.js`
  - `src/domain/resultado.js`
  - `src/domain/estrategiaRedondeo.js` (contrato con función `aplicar(valor)`)
  - `src/domain/validarEntrada.js` (SRP: solo valida)
  - `src/domain/calcularDivision.js` (SRP: solo calcula; OCP/LSP: sin branching ni type checks)
  - `src/data/redondeoExacto.js` y `src/data/redondeoHaciaArriba.js`
  - `src/presentation/formateadorMoneda.js` (SRP: solo formatea a 2 decimales)
  - `src/presentation/useDivisor.js` (DIP: hook con inyección de dependencias)
  - `src/presentation/PantallaDivisor.jsx` (solo interfaz visual y accesibilidad)
  - `src/main.jsx` (DIP: único punto de composición)
- Se transcribieron los 6 casos de negocio en `test/casosDePrueba.js`.
- Se implementaron las pruebas unitarias y de sustitución en `test/division.test.js`.
- Se implementaron las pruebas de interfaz en `test/pantalla.test.jsx`.

### 7. Ejecución de Pruebas y Verificación SOLID
- **Suite de Dominio:** `npx vitest run test/division.test.js` -> 7/7 pruebas pasadas.
- **Suite Completa:** `npm test` -> 10/10 pruebas pasadas.
- **Verificaciones con `git grep`:**
  - `git grep -n "from 'react'" -- src/domain/` -> Salida vacía (pureza de dominio absoluta).
  - `git grep -n "redondeoExacto\|redondeoHaciaArriba" -- src/` -> Aparece ÚNICAMENTE en `src/main.jsx` fuera de `src/data/`.
  - `git grep -n "instanceof\|=== 'exacto'\|=== 'arriba'" -- src/domain/calcularDivision.js` -> Salida vacía (OCP y LSP garantizados).
  - `git grep -n "toFixed\|inválido\|al menos una persona" -- src/domain/calcularDivision.js` -> Salida vacía (SRP garantizado).
- **Compilación de producción:** `npm run build` terminó en 387ms sin errores.
- Commit final: `divisor de cuenta en react, los 6 casos pasan`.
