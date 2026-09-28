# Especificación: Respuesta del Coach - Orientación Inmediata

## 1. Historia de Usuario (User Story)
**Como** cuidador en medio de una situación difícil,
**quiero** recibir instrucciones claras, cortas y divididas en pasos accionables,
**para** saber exactamente qué hacer, qué decir y qué evitar en el momento de mayor tensión.

## 2. Criterios de Aceptación (Definition of Done)
- **Navegación:** La pantalla debe aparecer después de que el usuario selecciona una crisis en la pantalla 'Ayúdame ahora'.
- **Cabecera (Header):** Botón de regreso (`ChevronLeft`), el título 'Orientación para esta situación' y botón de opciones (`MoreVertical`).
- **Tarjeta de Contexto:** En la parte superior, debajo del header, debe mostrarse un resumen de la situación seleccionada (ej. 'Situación: Rabieta por apagar la tablet - Niño de 7 años') acompañado de un emoji o ilustración.
- **Bloques de Orientación (4 pasos):** La respuesta debe organizarse en 4 tarjetas distintas:
  1. **Haz esto ahora:** Una acción concreta. Icono asociado (ej. llave inglesa o pin).
  2. **Puedes decir:** Una frase textual en cursiva o destacada. Icono asociado (reloj o burbuja de chat).
  3. **Evita:** Lista con viñetas de acciones a no hacer. Icono asociado (alerta roja).
  4. **Cuando se calme:** Qué hacer después. Icono asociado (bombillo o flecha).
- **Pie de página (Feedback):** Al final debe preguntar '¿Te fue útil esta orientación?' con botones de 👍 y 👎.

## 3. Especificaciones UI/UX (Frontend)
- **Estilo Minimalista:** Mantener fondo `bg-slate-50`. Usar tarjetas `bg-white` con `rounded-2xl` y `shadow-sm` para separar visualmente cada bloque de orientación.
- **Jerarquía Visual:** Usar colores semánticos muy tenues en los iconos o pequeños detalles laterales de cada tarjeta para guiar el ojo (ej. verde para 'Haz esto', azul para 'Puedes decir', rojo para 'Evita', amarillo para 'Cuando se calme'). 
- **Tipografía:** Albert Sans. Textos descriptivos en tamaño `text-sm` y color gris oscuro.
