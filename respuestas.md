# Respuestas al Deber 2 — SDD: Cambiar la Tecnología sin Cambiar la Especificación

**Programación Asistida de Aplicaciones · USFQ**  
**Estudiante:** Felipe  
**Profesor:** Jose David Vega Sánchez  
**Proyecto:** Migración del Divisor de Cuenta de Flutter a React  

---

## Pregunta 1
### ¿Qué porcentaje de la spec viajó intacto, qué porcentaje necesitó adaptación y qué porcentaje no pudo reutilizarse? Justifica la clasificación con `analisis_spec.md` y el diff. Si registraste tiempo, inclúyelo como contexto, no como criterio único de calidad.

### Respuesta:
Al descomponer la especificación (`specs/001-divisor-cuenta/spec.md`) en sus **19 enunciados atómicos** independientes (detallados en `analisis_spec.md`), los resultados cuantitativos son:

- **Viajó intacto (QUÉ):** **89.47%** (17 de 19 enunciados). Todos los requisitos de comportamiento funcional, las historias de usuario, los 6 criterios de aceptación con valores numéricos y mensajes de error literales, las clarificaciones de propina por defecto (0%) y el formateo a dos decimales se reutilizaron sin modificar una sola letra.
- **Viajó con adaptación (MIXTO):** **5.26%** (1 de 19 enunciados). La restricción técnica que indicaba *"Sin paquetes externos, exclusivamente Flutter y Dart SDK estándar"*. La idea esencial (operar sin dependencias externas pesadas para estado ni bibliotecas de terceros) viajó intacta, pero su redacción técnica requería sustituir "Flutter y Dart SDK" por "React y Vite estándar".
- **No viajó (CÓMO):** **5.26%** (1 de 19 enunciados). La frase incidental *"Aplicación Flutter de una sola pantalla"* en el resumen ejecutivo, la cual hacía referencia al framework móvil original.

$$\% \text{ CÓMO} = \frac{1}{19} \times 100 = 5.26\%$$

### Evidencia del Diff:
A pesar de la presencia menor del 5.26% de contexto tecnológico en el resumen, el archivo físico `spec.md` se importó **100% idéntico** en el repositorio de React. La verificación obligatoria con Git arrojó una salida **completamente vacía**:

```powershell
PS C:\...\divisor_cuenta_web> git diff --no-index -- "..\..\participacion 7\divisor_cuenta\specs\001-divisor-cuenta\spec.md" "specs\001-divisor-cuenta\spec.md"
# (Salida vacía, código de retorno 0)
```

### Contexto de tiempo:
El tiempo registrado hasta que los 6 casos de aceptación pasaron en verde en React fue de **~6 minutos** (frente a los ~12 minutos de la implementación inicial en Flutter). Este ahorro temporal no se debió a que React sea intrínsecamente más rápido de programar, sino a que **no hubo que gastar tiempo descubriendo, discutiendo ni clarificando los requisitos de negocio**: el 100% de los escenarios ya estaban formalizados, delimitados y libres de ambigüedad en la especificación heredada.

---

## Pregunta 2
### En la Constitution, clasifica cada regla como idéntica, adaptada en redacción o reemplazada. Explica por qué y cita evidencia de ambas constituciones.

### Respuesta:
La Constitución (`constitution.md`) establece las reglas de arquitectura y calidad del proyecto. Su análisis comparativo arrojó que **el 75% de sus reglas viajaron idénticas, el 25% con adaptación de redacción tecnológica, y 0% fueron reemplazadas**:

| Regla Constitucional | Clasificación | Evidencia en Flutter (`divisor_cuenta`) | Evidencia en React (`divisor_cuenta_web`) | Justificación |
|---|:---:|---|---|---|
| **SOLID — SRP** | **Idéntica** | *"Una clase, una razón de cambio. El cálculo no valida ni formatea."* | *"Una función o módulo, una razón de cambio. El cálculo no valida ni formatea."* | El principio de responsabilidad única es agnóstico al lenguaje; la separación entre cálculo, validación y formateo es permanente. |
| **SOLID — OCP** | **Idéntica** | *"Agregar una nueva regla de redondeo no obliga a editar las clases que ya existen."* | *"Agregar una nueva regla de redondeo no obliga a editar los módulos que ya existen."* | Abierto a extensión y cerrado a modificación aplica igual para clases de Dart que para módulos de JavaScript. |
| **SOLID — LSP** | **Idéntica** | *"Cualquier implementación de una interfaz puede sustituir a otra sin que quien la usa tenga que preguntar de qué tipo es (sin `is` ni `as`)."* | *"Cualquier implementación de la interfaz de redondeo puede sustituir a otra sin que quien la usa pregunte de qué tipo es (sin `instanceof`, `typeof` ni comprobaciones de tipo)."* | La sustituibilidad de Liskov es idéntica; solo cambia el operador prohibido (`is/as` en Dart vs `instanceof/typeof` en JS). |
| **SOLID — ISP** | **Idéntica** | *"Interfaces pequeñas; nadie depende de métodos que no usa (interfaz con un solo método para redondeo)."* | *"Interfaces pequeñas; nadie depende de funciones que no usa (contrato de una sola función `aplicar(valor)`)."* | El contrato mínimo de una sola función/método viaja idéntico. |
| **SOLID — DIP** | **Idéntica** | *"presentation depende de abstracciones de domain, nunca de clases concretas de data."* | *"presentation depende de abstracciones de domain, nunca de implementaciones concretas de data."* | La dirección de la inversión de dependencias no depende de la tecnología. |
| **Estructura de Capas** | **Adaptada en redacción** | *"Separación explícita en `lib/presentation`, `lib/domain` y `lib/data`."* | *"Separación explícita en `src/presentation`, `src/domain` y `src/data`."* | El principio de 3 capas limpias se mantiene; se adaptó el prefijo de carpeta convencional (`lib/` en Dart a `src/` en Node/React). |
| **Regla de Dependencia** | **Idéntica** | *"presentation -> domain <- data."* | *"presentation -> domain <- data."* | La topología de dependencias arquitectónicas es idéntica. |
| **Pureza de Dominio** | **Adaptada en redacción** | *"`lib/domain/` NO importa nada de `package:flutter` (es Dart puro)."* | *"`src/domain/` NO importa `react` ni nada del DOM: es JavaScript puro."* | El principio es idéntico (el dominio no conoce la UI ni el framework); se adaptó el nombre de la biblioteca vetada. |
| **Punto Único de Composición** | **Adaptada en redacción** | *"`lib/main.dart` es el ÚNICO lugar donde se instancian implementaciones concretas."* | *"`src/main.jsx` es el ÚNICO lugar donde se instancian implementaciones concretas."* | La regla arquitectónica viaja idéntica; solo cambia el archivo de arranque (`main.dart` vs `main.jsx`). |
| **Seguridad** | **Idéntica** | *"Nunca guardar secretos ni API keys en el repositorio."* | *"Nunca guardar secretos ni API keys en el repositorio."* | Regla universal e invariable. |
| **Calidad y Pruebas** | **Idéntica** | *"Toda funcionalidad crítica tiene pruebas automatizadas. Los criterios de aceptación de cada spec se convierten en pruebas ejecutables verificables."* | *"Toda funcionalidad crítica tiene pruebas. Los criterios de aceptación de la spec se convierten en pruebas ejecutables verificables."* | La exigencia de cobertura para los criterios de aceptación no cambia. |
| **Regla de la Materia** | **Idéntica** | *"Toda función generada por el agente debe poder explicarla el estudiante..."* | *"Toda función generada por el agente debe poder explicarla el estudiante..."* | Regla pedagógica y de integridad técnica intacta. |

---

## Pregunta 3
### ¿Tuviste que modificar algún enunciado de la spec para implementar React? Si sí: transcribe la versión original, explica qué decisión técnica se había mezclado con el QUÉ, muestra la versión corregida y enlaza la evidencia del cambio separado. Si no, explica qué permitió reutilizar la spec sin cambios.

### Respuesta:
**NO se tuvo que modificar ningún enunciado de la especificación.** La copia inicial de `spec.md` se utilizó directamente y permitió generar el plan, las tareas y la implementación en React sin encontrar contradicciones ni bloqueos.

### ¿Qué permitió reutilizar la spec sin cambios?
1. **Separación estricta entre QUÉ y CÓMO desde el origen:** Durante la redacción de la spec en el laboratorio anterior, los requisitos se formularon exclusivamente en términos de entradas del usuario (monto, número de personas, propina, modo de redondeo), comportamiento esperado del sistema (cálculo de cuotas, redondeo al entero más cercano) y salidas observables (números con dos decimales o mensajes de error exactos).
2. **Criterios de Aceptación Declarativos (Gherkin / Given-When-Then):** Los escenarios de prueba se redactaron de manera agnóstica a widgets o componentes web (ej. *"Dado monto = 100.00, personas = 4... Cuando se presiona 'Calcular'... Entonces el resultado mostrado por persona es 27.50"*). No mencionaban `TextFormField`, `StatefulWidget`, `HTMLInputElement` ni `onClick`.
3. **Manejo explícito de clarificaciones:** Las ambigüedades de negocio (como el valor por defecto de 0% de propina y el formato a 2 decimales para enteros) se resolvieron a nivel de especificación, evitando que el agente tuviera que "adivinar" cómo estructurar los casos en JavaScript.

---

## Pregunta 4
### Compara los seis casos de aceptación de Flutter y React. ¿Cambió algún valor esperado, mensaje o escenario? Si cambió, explica si fue necesario por la tecnología o si fue un error de diseño/implementación.

### Respuesta:
**No cambió absolutamente ningún valor esperado, mensaje de error ni escenario.**

A continuación se muestra la comparación directa entre `test/casos_de_prueba.dart` (Flutter) y `test/casosDePrueba.js` (React):

| Escenario | Flutter (`casos_de_prueba.dart`) | React (`casosDePrueba.js`) | ¿Cambió algo? |
|---|---|---|:---:|
| **1. Reparto normal** | Monto: 100.00, Personas: 4, Propina: 10, Modo: exacto $\rightarrow$ **27.50** | `monto: 100.00, personas: 4, propina: 10, modo: 'exacto'` $\rightarrow$ **esperado: 27.50** | **Idéntico** |
| **2. Sin propina** | Monto: 90.00, Personas: 3, Propina: 0, Modo: exacto $\rightarrow$ **30.00** | `monto: 90.00, personas: 3, propina: 0, modo: 'exacto'` $\rightarrow$ **esperado: 30.00** | **Idéntico** |
| **3. Cero personas** | Monto: 50.00, Personas: 0 $\rightarrow$ Error: **"Debe haber al menos una persona"** | `monto: 50.00, personas: 0` $\rightarrow$ `errorEsperado: 'Debe haber al menos una persona'` | **Idéntico** |
| **4. Monto no numérico** | Monto: `double.nan` $\rightarrow$ Error: **"Monto inválido"** | `monto: NaN` $\rightarrow$ `errorEsperado: 'Monto inválido'` | **Idéntico** |
| **5. Redondeo exacto** | Monto: 10.00, Personas: 3, Propina: 0, Modo: exacto $\rightarrow$ **3.33** | `monto: 10.00, personas: 3, propina: 0, modo: 'exacto'` $\rightarrow$ **esperado: 3.33** | **Idéntico** |
| **6. Redondeo hacia arriba** | Monto: 10.00, Personas: 3, Propina: 0, Modo: arriba $\rightarrow$ **4.00** | `monto: 10.00, personas: 3, propina: 0, modo: 'arriba'` $\rightarrow$ **esperado: 4.00** | **Idéntico** |

### Conclusión:
La única diferencia radicó en la sintaxis de definición (`List<CasoDePrueba>` fuertemente tipada en Dart frente a un arreglo de objetos `const casos = [...]` en JavaScript). Esta invariancia demuestra empíricamente que **las reglas de negocio no son propiedad del framework**; cuando una especificación está bien formulada, los casos de prueba son universales.

---

## Pregunta 5
### ¿Qué partes del plan Flutter dejaron de tener sentido en React? Da al menos tres ejemplos concretos y explica cómo se adaptaron.

### Respuesta:
El plan de implementación (`plan.md`) es el contenedor por excelencia del **CÓMO**. Al cambiar de plataforma móvil a web, múltiples decisiones de Flutter quedaron obsoletas y tuvieron que reconstruirse por completo:

1. **Gestión de dependencias y configuración del proyecto:**
   - *En Flutter:* El plan contemplaba `pubspec.yaml`, el SDK de Flutter y comandos de `flutter pub get`.
   - *Por qué dejó de tener sentido:* React en el navegador no utiliza el motor de Flutter ni la máquina virtual de Dart; requiere Node.js, `npm` y `package.json`.
   - *Cómo se adaptó:* Se adoptó **Vite** como entorno de desarrollo y empaquetador ultrarrápido para JavaScript ES Modules.
2. **Manejo de estado y ciclo de vida de la UI:**
   - *En Flutter:* El plan original consideraba widgets reactivos de Flutter (`StatefulWidget`, `setState` o `ConsumerWidget` de Riverpod) y el árbol de elementos de Flutter (`BuildContext`, `MediaQuery`).
   - *Por qué dejó de tener sentido:* En React, la UI se construye mediante componentes funcionales sobre el Virtual DOM.
   - *Cómo se adaptó:* Se utilizó el hook estándar de React **`useState`** dentro de un custom hook desacoplado (`src/presentation/useDivisor.js`), inyectándole las dependencias de dominio y manteniendo la presentación sin dependencias de estado globales.
3. **Framework y entorno de ejecución de pruebas automatizadas:**
   - *En Flutter:* El plan se estructuraba alrededor de `flutter_test`, `WidgetTester`, `pumpWidget()` y `find.text()`.
   - *Por qué dejó de tener sentido:* `flutter_test` requiere compilar código Dart y simular el pipeline gráfico de Flutter.
   - *Cómo se adaptó:* Se configuró **Vitest** con el entorno **`jsdom`** y **`@testing-library/react`** (`render`, `screen`, `fireEvent`), permitiendo ejecutar tanto pruebas de dominio puro sin navegador como pruebas de componentes simulando eventos del DOM.

---

## Pregunta 6
### ¿Qué artefacto fue el más reusable y cuál el menos reusable? Justifica ambas respuestas con evidencia del repositorio (diffs, archivos, pruebas o historial de Git).

### Respuesta:

### 1. El artefacto MÁS reusable: La Especificación (`spec.md`) y los Casos de Aceptación
- **Evidencia en el repositorio:**
  - El diff entre la versión Flutter y la versión React fue **completamente nulo** (`git diff --no-index` arrojó 0 diferencias).
  - Los 6 casos de aceptación en `test/casosDePrueba.js` conservaron exactamente los mismos valores numéricos, márgenes de tolerancia (`toBeCloseTo(..., 2)`) y cadenas literales de error.
  - La Constitución (`constitution.md`) también demostró una reusabilidad muy alta (75% idéntica y 25% adaptada únicamente en nomenclatura de carpetas y frameworks).
- **Justificación:** La especificación externalizó con éxito el conocimiento del sistema (el **QUÉ**). El cambio radical de plataforma (de app móvil nativa en Dart a aplicación web en React) no alteró en lo más mínimo cómo se calcula la división de una cuenta en un restaurante.

### 2. El artefacto MENOS reusable: El Código de Implementación (`lib/`) y el Plan (`plan.md` / `tasks.md`)
- **Evidencia en el repositorio:**
  - **0% del código en Dart de `lib/` pudo reutilizarse directamente en la app web:** Ningún archivo `.dart` puede ser ejecutado nativamente por un navegador web dentro de un proyecto Vite/React sin una reescritura total a JavaScript (`.js` / `.jsx`).
  - El historial de Git demuestra que se requirió un commit exclusivo (`ff41ddc: plan y tareas para react`) con un `plan.md` reescrito en su totalidad para definir la arquitectura en Vite, `useState` y Vitest.
  - Las tareas (`tasks.md`) pasaron de crear clases Dart y widgets a crear módulos ES6 y componentes funcionales JSX.
- **Justificación:** El código y el plan pertenecen por definición al **CÓMO**. Las decisiones de sintaxis, librerías, tipado, bundlers y frameworks están fuertemente acopladas a la tecnología elegida. Cuando la tecnología cambia, el CÓMO debe descartarse y rehacerse.

---

## Conclusión General sobre SDD
Este ejercicio demostró la tesis central de **Spec-Driven Development**: cuando las decisiones de negocio y calidad se externalizan formalmente en artefactos de especificación y constitución antes de codificar, **el conocimiento fundamental del sistema sobrevive intacto al cambio tecnológico**. El desarrollador y el agente de IA no tienen que renegociar qué debe hacer la aplicación, logrando una reimplementación limpia, rápida y 100% verificable mediante pruebas automatizadas.
