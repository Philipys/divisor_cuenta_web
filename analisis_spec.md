# Análisis de Especificación y Constitución: Migración Flutter a React

**Materia:** Programación Asistida de Aplicaciones · USFQ  
**Estudiante:** Felipe  
**Profesor:** Jose David Vega Sánchez  
**Proyecto:** Deber 2 — SDD: cambiar la tecnología sin cambiar la especificación  

---

## 1. Análisis de Enunciados de la Especificación (`spec.md`)

En Spec-Driven Development (SDD), la especificación define el **QUÉ** (comportamiento, reglas de negocio y criterios verificables), el cual debe permanecer invariante ante cambios tecnológicos.

Para este análisis, se descompuso `spec.md` en sus **enunciados atómicos** independientes (cada requisito, regla o criterio verificable):

| # | Enunciado de la spec | Tipo | ¿Viaja a React? | Justificación |
|---|---|:---:|:---:|---|
| 1 | "Una app de una sola pantalla para dividir la cuenta de un restaurante entre varias personas." | **QUÉ** | ✅ Intacto | Propósito general y alcance del sistema; no depende de la plataforma. |
| 2 | "Permite a los comensales calcular de forma offline la cuota exacta que cada persona debe pagar." | **QUÉ** | ✅ Intacto | Requisito funcional y disponibilidad local (sin conexión a servidor). |
| 3 | "Considerando monto total, número de personas y porcentaje de propina." | **QUÉ** | ✅ Intacto | Parámetros de negocio indispensables para el cálculo de la cuenta. |
| 4 | "Estrategia de redondeo configurable (exacto o hacia arriba al entero más cercano)." | **QUÉ** | ✅ Intacto | Regla de negocio que define las alternativas matemáticas para el comensal. |
| 5 | "Aplicación Flutter de una sola pantalla" (mención contextual en resumen ejecutivo). | **CÓMO** | ❌ No viaja | Nombra explícitamente el framework móvil original (Flutter). |
| 6 | "Como comensal, quiero ingresar el monto, número de comensales y propina para ver rápidamente cuánto le corresponde pagar a cada persona con dos decimales." | **QUÉ** | ✅ Intacto | Historia de usuario 1 y regla de presentación obligatoria a 2 cifras decimales. |
| 7 | "Escenario 1 (Reparto normal con propina): Dado monto = 100.00, personas = 4, propina = 10%, modo = exacto; Cuando se presiona 'Calcular'; Entonces el resultado mostrado por persona es 27.50." | **QUÉ** | ✅ Intacto | Criterio de aceptación determinista e independiente del lenguaje. |
| 8 | "Escenario 2 (Sin propina): Dado monto = 90.00, personas = 3, propina = 0%, modo = exacto; Cuando se presiona 'Calcular'; Entonces el resultado mostrado por persona es 30.00." | **QUÉ** | ✅ Intacto | Criterio de aceptación verificable para propina cero. |
| 9 | "Escenario 5 (Redondeo exacto con decimales periódicos): Dado monto = 10.00, personas = 3, propina = 0%, modo = exacto; Cuando se presiona 'Calcular'; Entonces el resultado mostrado por persona es 3.33." | **QUÉ** | ✅ Intacto | Criterio de aceptación para división fraccionaria periódica. |
| 10 | "Como usuario que no dispone de monedas fraccionarias o desea dejar una cuota entera, quiero poder elegir el redondeo hacia arriba al entero más cercano." | **QUÉ** | ✅ Intacto | Historia de usuario 2 que motiva la funcionalidad de redondeo entero. |
| 11 | "Escenario 6 (Redondeo hacia arriba): Dado monto = 10.00, personas = 3, propina = 0%, modo = hacia arriba; Cuando se presiona 'Calcular'; Entonces el resultado mostrado por persona es 4.00." | **QUÉ** | ✅ Intacto | Criterio de aceptación determinista para la estrategia de techo entero. |
| 12 | "Como usuario, si cometo un error al tipear los datos, la aplicación debe alertarme con un mensaje claro y NO mostrar ningún resultado de cálculo." | **QUÉ** | ✅ Intacto | Historia de usuario 3 y regla de bloqueo de cálculo frente a entradas inválidas. |
| 13 | "Escenario 3 (Cero o menos personas): Dado monto = 50.00 y personas = 0; Cuando se presiona 'Calcular'; Entonces se muestra el mensaje exacto 'Debe haber al menos una persona' y NO se muestra resultado." | **QUÉ** | ✅ Intacto | Criterio de aceptación con mensaje literal exigido por el negocio. |
| 14 | "Escenario 4 (Monto no numérico o inválido): Dado monto = 'abc' o valores no numéricos; Cuando se presiona 'Calcular'; Entonces se muestra el mensaje exacto 'Monto inválido' y NO se muestra resultado." | **QUÉ** | ✅ Intacto | Criterio de aceptación y mensaje literal ante formato de moneda inválido. |
| 15 | "Clarificación 1: Si el campo de porcentaje de propina queda vacío, se asume un valor por defecto de 0% de propina." | **QUÉ** | ✅ Intacto | Decisión de diseño de negocio para evitar bloqueos innecesarios. |
| 16 | "Clarificación 2: El formateador siempre debe mostrar exactamente dos cifras decimales (30.00, 4.00, etc.) utilizando la representación estándar monetaria." | **QUÉ** | ✅ Intacto | Requisito formal de visualización de moneda. |
| 17 | "Restricción: 100% desconectado (Offline First), sin peticiones de red ni persistencia en base de datos." | **QUÉ** | ✅ Intacto | Restricción arquitectónica de ejecución puramente local en el cliente. |
| 18 | "Restricción: Sin paquetes externos, exclusivamente Flutter y Dart SDK estándar." | **MIXTO** | ⚠️ Adaptado | La idea de no depender de paquetes externos innecesarios viaja; la mención de Flutter y Dart SDK debe adaptarse al stack de destino (React + Vite estándar). |
| 19 | "Restricción: Alineación Constitucional: Cumplimiento total de SOLID y separación en presentation, domain y data." | **QUÉ** | ✅ Intacto | Principios de diseño de software limpios y agnósticos al framework. |

---

### Métricas Cuantitativas de la Especificación

- **Total de enunciados atómicos analizados:** 19
- **Enunciados clasificados como QUÉ:** 17 (89.47%)
- **Enunciados clasificados como MIXTO:** 1 (5.26%)
- **Enunciados clasificados como CÓMO:** 1 (5.26%)

#### Cálculo del Porcentaje CÓMO:
$$\% \text{ CÓMO} = \frac{\text{cantidad de enunciados CÓMO}}{\text{total de enunciados}} \times 100 = \frac{1}{19} \times 100 = 5.26\%$$

> **Evaluación frente al umbral pedagógico:**  
> El **5.26%** se encuentra ampliamente por debajo del umbral del **30%** definido en la guía del deber para considerar una especificación "contaminada" de decisiones técnicas. Esto demuestra una excelente separación del QUÉ respecto del CÓMO lograda durante la fase de especificación en Flutter, lo que permitió reutilizar `spec.md` de manera idéntica (`git diff --no-index` completamente vacío).

---

## 2. Análisis de la Constitución (`constitution.md`)

Para la Constitución, cada principio y regla se clasifica según su reusabilidad al migrar de Flutter a React: **idéntica**, **adaptada en redacción** o **reemplazada**.

| Principio / Regla | Clasificación | Justificación y Evidencia Comparativa |
|---|:---:|---|
| **I. SRP (Single Responsibility)** | **Idéntica** | El principio de responsabilidad única es universal. En Flutter: *"Una clase, una razón de cambio. El cálculo no valida ni formatea"*. En React: *"Una función o módulo, una razón de cambio. El cálculo no valida ni formatea"*. La regla de negocio de que el cálculo matemático no formatea ni valida se mantiene exactamente igual. |
| **I. OCP (Open/Closed)** | **Idéntica** | Agregar una nueva regla de redondeo no obliga a editar los módulos/clases existentes. Permanece idéntica conceptualmente tanto en Dart como en JavaScript. |
| **I. LSP (Liskov Substitution)** | **Idéntica** | Cualquier implementación de redondeo puede sustituir a otra sin comprobaciones de tipo. En Flutter prohibía `is`/`as`; en React prohíbe `instanceof`, `typeof` o comparaciones de string. |
| **I. ISP (Interface Segregation)** | **Idéntica** | Se exige una abstracción mínima con un único método/función (`redondear(valor)` en Flutter; `aplicar(valor)` en React). Nadie depende de funciones que no usa. |
| **I. DIP (Dependency Inversion)** | **Idéntica** | `presentation` depende de abstracciones de `domain`, nunca de implementaciones concretas de `data`. Idéntica en ambas tecnologías. |
| **II. Estructura de Capas** | **Adaptada en redacción** | En Flutter: `lib/presentation`, `lib/domain` y `lib/data`. En React / Node: `src/presentation`, `src/domain` y `src/data`. Cambia la convención de carpetas del lenguaje (`lib/` vs `src/`), pero la topología es la misma. |
| **II. Regla de Dependencia** | **Idéntica** | `presentation -> domain <- data`. La dirección de las dependencias arquitectónicas es invariante. |
| **II. Pureza de Dominio** | **Adaptada en redacción** | En Flutter: `lib/domain/` NO importa nada de `package:flutter` (Dart puro). En React: `src/domain/` NO importa `react` ni nada del DOM (JavaScript puro). La idea de independencia total del framework viaja 100%; solo cambia el paquete prohibido. |
| **II. Punto Único de Composición** | **Adaptada en redacción** | En Flutter: `lib/main.dart` es el único lugar donde se instancian `RedondeoExacto()` y `RedondeoHaciaArriba()`. En React: `src/main.jsx` es el único punto donde se componen e inyectan `redondeoExacto` y `redondeoHaciaArriba`. |
| **III. Seguridad** | **Idéntica** | "Nunca guardar secretos ni API keys en el repositorio". Regla universal y obligatoria en cualquier stack. |
| **IV. Calidad y Pruebas** | **Idéntica** | Toda funcionalidad crítica tiene pruebas automatizadas; los criterios de aceptación se convierten en pruebas ejecutables verificables. |
| **V. Regla de la Materia** | **Idéntica** | Toda función generada por el agente debe poder ser explicada por el estudiante (qué hace, por qué existe, qué recibe, qué devuelve y qué errores produce). |

### Resumen de la Constitución:
- **Reglas idénticas:** 9 (75%)
- **Reglas adaptadas en redacción:** 3 (25%)
- **Reglas reemplazadas:** 0 (0%)
- **Reglas inventadas o innecesarias:** 0 (0%)
