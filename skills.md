# Skills y Directrices: App "Crecer" (Coach Virtual)

Este documento establece las reglas estrictas de desarrollo, diseño UI/UX y comportamiento (tono) que se deben seguir en la construcción de cada componente de la aplicación "Crecer".

## 1. Stack Técnico

- **Framework:** React (usando componentes funcionales).
- **Estilos:** Tailwind CSS.
- **Iconografía:** Lucide React.

## 2. Directrices de Diseño UI/UX

- **Enfoque:** Estrictamente **"mobile-first"**. Utilizar contenedores centrados con ancho máximo (ej. `max-w-md` o `max-w-lg`) para simular la vista móvil en pantallas grandes.
- **Estética:** Minimalista. 
  - Usar fondos limpios (ej. `bg-slate-50` o blanco).
  - Tarjetas con bordes redondeados (`rounded-2xl`).
  - Abundante espacio en blanco (`gap-4`, `p-4`).
  - Sombras muy sutiles (`shadow-sm`).
- **Tipografía:** Uso exclusivo de la fuente **'Albert Sans'** para garantizar una lectura clara y moderna.
- **Colores:** 
  - **Color principal y de acento:** `#A9A0EC` (utilizado para botones, iconos activos y elementos de marca).
  - **Colores semánticos suaves:** 
    - Rojo tenue para "Ayúdame ahora".
    - Amarillo para "Aprender".
    - Verde menta para el avatar del coach y el progreso.

## 3. Comportamiento del Coach Virtual

- **Tono comunicativo:** Empático, **cero culpabilizante**, no moralizante.
- **Formato de respuesta:** Mensajes cortos (máximo 2 a 4 párrafos). Cada interacción debe terminar siempre en una **acción o pregunta reflexiva** para guiar al usuario.
- **Adaptabilidad:** El lenguaje, los ejemplos y las estrategias deben cambiar dinámicamente según la edad del hijo (3-6, 7-10 o 11-18 años).

## 4. Protocolos de Seguridad

El sistema debe reconocer y clasificar las situaciones en tres niveles, ajustando su comportamiento en consecuencia:
- **Verde (Cotidiano):** Situaciones normales de crianza (rutinas, berrinches leves, tareas). Se aplican pautas normales.
- **Amarillo (Requiere apoyo):** Desafíos persistentes o situaciones de estrés alto para el cuidador.
- **Rojo (Riesgo grave):** Casos de violencia, autolesión, abuso o peligro inminente.
  - *Acción obligatoria en código Rojo:* La app **debe interrumpir las pautas de crianza** de inmediato y mostrar pantallas o rutas de atención profesional/emergencia pertinentes.


## Directrices de Accesibilidad Cognitiva y Reducción de Estrés (Bajo Esfuerzo UX)

En todas las pantallas orientadas a la gestión de crisis (ej. 'Ayúdame ahora', Modo 'PAUSA') o donde el cuidador pueda experimentar alta carga emocional o cansancio:

1. **Cero Muros de Texto:** 
   - Prohibido utilizar párrafos extensos o instrucciones complejas. 
   - Las explicaciones deben reducirse a una o dos líneas de validación empática y directa.

2. **Diseño por Pasos (Wizards Secuenciales):**
   - Los flujos de decisión o autoevaluación deben dividirse en pantallas individuales de una sola pregunta o acción a la vez, con transiciones suaves, evitando saturar visualmente al usuario.

3. **Micro-interacciones y Elementos Táctiles Grandes:**
   - Priorizar botones de selección rápida, chips con emojis grandes y escalas visuales táctiles (1 al 5) en lugar de campos de texto abiertos o formularios largos.

4. **Apoyo Visual Calmante:**
   - Utilizar elementos visuales que reduzcan la ansiedad de forma inmediata (ej. círculos de respiración animados, colores pasteles o semánticos suaves) y evitar elementos visuales agresivos o tipografías saturadas.